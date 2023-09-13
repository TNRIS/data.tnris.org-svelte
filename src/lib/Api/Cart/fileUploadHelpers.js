import { handleErrorsHelper } from "./handleErrorsHelpers";

export async function getUploadPolicy(fileInfo) {
  const { collectionId, file, submitType } = fileInfo;
  const fileKey = `data-tnris-org-order/${collectionId}_${Date.now()}_${file.name
    .split(" ")
    .join("_")}`;
  const policyUrl = `https://api.tnris.org/api/v1/contact/policy/${
    submitType === "application/zip" ? "zip-upload" : "image-upload"
  }`;
  const payload = {
    method: "POST",
    body: JSON.stringify({ key: fileKey }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache"
  };
  const policyResponse = await fetch(policyUrl, payload);
  return await policyResponse.json();
}

export async function uploadFilesToS3(
  collectionId,
  files,
  uploadType,
  setStatusCallback
) {
  return Promise.all(
    [...files].map(async (file, idx) => {
      setStatusCallback({
        status: `Fetching policy for ${file.name}`,
      });
      // fetch upload policy to attach to form data
      const policy = await getUploadPolicy({
        file: file,
        collectionId: collectionId,
        submitType: uploadType,
      });
      // build fake form to do the upload. required to use the s3 rest api
      let formData = new FormData();
      formData.append("key", policy.fields.key);
      formData.append("acl", "private");
      formData.append("success_action_status", "201");
      formData.append("success_action_redirect", "");
      // if a zipfile upload, declare as application/zip as per contact-app policy requirement
      // otherwise, use the individual file type
      let contentType;
      if (uploadType === "Shapefile") {
        switch (file.type) {
          case "application/zip":
            contentType = "application/zip";
            break;
          case "application/x-zip-compressed":
            contentType = "application/zip";
            break;
          case "application/x-zip":
            contentType = "application/zip";
            break;
          default:
            contentType = file.type;
        }
      } else {
        contentType = file.type;
      }
      formData.append("Content-Type", contentType);
      formData.append("Content-Length", file.size);
      formData.append("Policy", policy.fields.policy);
      formData.append("x-amz-algorithm", policy.fields["x-amz-algorithm"]);
      formData.append("x-amz-credential", policy.fields["x-amz-credential"]);
      formData.append("x-amz-date", policy.fields["x-amz-date"]);
      formData.append("x-amz-signature", policy.fields["x-amz-signature"]);
      //check if originFileObj exists. If it does, it is the blob to upload
      //otherwise, the file object is the correct object path
      //Ant Design Upload component attaches the JS File() blob to the originFileObj path
      //of the first object added to the fileList array.
      //Subsequently added file blobs are attached directly as Javascript File() blobs  
      formData.append("file", file["originFileObj"] ? file.originFileObj : file, file.name);
      const payload = {
        method: "POST",
        body: formData,
        cache: "no-cache"
      };
      setStatusCallback({
        status: `Uploading ${file.name}`,
      });
      const uploadResponse = await fetch(policy.url, payload);
      const uploadRes = await handleErrorsHelper(uploadResponse);
      if (uploadRes.ok) {
        setStatusCallback({
          status: `Finished uploading ${file.name}`,
        });
      } else {
        setStatusCallback({
          status: `Error while uploading ${file.name}`,
        });
      }
      return {
        filename: file.name,
        link: "https://s3.amazonaws.com/contact-uploads/" + policy.fields.key,
      };
    })
  );
}