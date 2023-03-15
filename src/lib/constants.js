export const CATALOG_FILTER_CONSTANTS = {
  AVAILABILITY: [
    { label: "Download", value: "Download" },
    { label: "External Link", value: "External_Link" },
    { label: "Order Only", value: "Order_Only" },
    { label: "WMS Service", value: "WMS_Service" },
  ],
  CATEGORIES: [
    { value: "Basemap", label: "Basemap" },
    { value: "Elevation", label: "Elevation" },
    { value: "Historic_Imagery", label: "Historic Imagery" },
    { value: "Hydrography", label: "Hydrography" },
    { value: "Imagery", label: "Imagery" },
    { value: "Land_Cover", label: "Land Cover" },
    { value: "Lidar", label: "Lidar" },
    { value: "Reference_Grid", label: "Reference Grid" },
    { value: "Transportation", label: "Transportation" },
    { value: "Weather", label: "Weather" },
    { value: "Bathymetry", label: "Bathymetry" },
  ],
  FILETYPE: [
    { value: "DEM", label: "DEM" },
    { value: "DWG", label: "DWG" },
    { value: "ECW", label: "ECW" },
    { value: "ESRI_Grid", label: "ESRI Grid" },
    { value: "GDB", label: "GDB" },
    { value: "GEOJSON", label: "GEOJSON" },
    { value: "IMG", label: "IMG" },
    { value: "JP2", label: "JP2" },
    { value: "JPG", label: "JPG" },
    { value: "LAZ", label: "LAZ" },
    { value: "MrSID", label: "MrSID" },
    { value: "SHP", label: "SHP" },
    { value: "TIFF", label: "TIFF" },
    { value: "TOPOJSON", label: "TOPOJSON" },
  ],
};

export const STATES_NAMES = [
  { label: "ALABAMA", value: "AL" },
  { label: "ALASKA", value: "AK" },
  { label: "AMERICAN SAMOA", value: "AS" },
  { label: "ARIZONA", value: "AZ" },
  { label: "ARKANSAS", value: "AR" },
  { label: "CALIFORNIA", value: "CA" },
  { label: "COLORADO", value: "CO" },
  { label: "CONNECTICUT", value: "CT" },
  { label: "DELAWARE", value: "DE" },
  { label: "DISTRICT OF COLUMBIA", value: "DC" },
  { label: "FEDERATED STATES OF MICRONESIA", value: "FM" },
  { label: "FLORIDA", value: "FL" },
  { label: "GEORGIA", value: "GA" },
  { label: "GUAM", value: "GU" },
  { label: "HAWAII", value: "HI" },
  { label: "IDAHO", value: "ID" },
  { label: "ILLINOIS", value: "IL" },
  { label: "INDIANA", value: "IN" },
  { label: "IOWA", value: "IA" },
  { label: "KANSAS", value: "KS" },
  { label: "KENTUCKY", value: "KY" },
  { label: "LOUISIANA", value: "LA" },
  { label: "MAINE", value: "ME" },
  { label: "MARSHALL ISLANDS", value: "MH" },
  { label: "MARYLAND", value: "MD" },
  { label: "MASSACHUSETTS", value: "MA" },
  { label: "MICHIGAN", value: "MI" },
  { label: "MINNESOTA", value: "MN" },
  { label: "MISSISSIPPI", value: "MS" },
  { label: "MISSOURI", value: "MO" },
  { label: "MONTANA", value: "MT" },
  { label: "NEBRASKA", value: "NE" },
  { label: "NEVADA", value: "NV" },
  { label: "NEW HAMPSHIRE", value: "NH" },
  { label: "NEW JERSEY", value: "NJ" },
  { label: "NEW MEXICO", value: "NM" },
  { label: "NEW YORK", value: "NY" },
  { label: "NORTH CAROLINA", value: "NC" },
  { label: "NORTH DAKOTA", value: "ND" },
  { label: "NORTHERN MARIANA ISLANDS", value: "MP" },
  { label: "OHIO", value: "OH" },
  { label: "OKLAHOMA", value: "OK" },
  { label: "OREGON", value: "OR" },
  { label: "PALAU", value: "PW" },
  { label: "PENNSYLVANIA", value: "PA" },
  { label: "PUERTO RICO", value: "PR" },
  { label: "RHODE ISLAND", value: "RI" },
  { label: "SOUTH CAROLINA", value: "SC" },
  { label: "SOUTH DAKOTA", value: "SD" },
  { label: "TENNESSEE", value: "TN" },
  { label: "TEXAS", value: "TX" },
  { label: "UTAH", value: "UT" },
  { label: "VERMONT", value: "VT" },
  { label: "VIRGIN ISLANDS", value: "VI" },
  { label: "VIRGINIA", value: "VA" },
  { label: "WASHINGTON", value: "WA" },
  { label: "WEST VIRGINIA", value: "WV" },
  { label: "WISCONSIN", value: "WI" },
  { label: "WYOMING", value: "WY" },
];

export const INDUSTRIES_OPTIONS = [
  "Agriculture",
  "Cartography",
  "Conservation",
  "Construction",
  "Consulting",
  "Education",
  "Emergency Management",
  "Environmental",
  "Forestry",
  "Government",
  "Insurance",
  "Law Enforcement",
  "Oil and Gas",
  "Public Health",
  "Retail",
  "Utilities",
  "Urban Planning",
  "Other",
];
export const SOFTWARE_OPTIONS = [
  "ArcMap",
  "ENVI",
  "ERDAS",
  "Global Mapper",
  "Integraph",
  "LP360",
  "Microstation",
  "PostGIS",
  "QGIS",
  "Other",
];

export const DELIVERY_OPTIONS = [
  { label: "Prepared Zipfile Download (Free, 10GB Max)", value: "ZIP" },
  { label: "USPS ($5 per hard drive)", value: "USPS" },
  { label: "Fedex ($15 per hard drive)", value: "FEDEX" },
  { label: "Pickup", value: "PICKUP" },
];

export const HARD_DRIVE_OPTIONS = [
  {
    label: "TNRIS Provided Hard Drive (1TB)",
    value: "TNRIS_HDD",
  },
  {
    label: "TNRIS Provided Flash Drive (64GB)",
    value: "TNRIS_FLASH",
  },
  {
    label: "Customer Provided Hard Drive",
    value: "CUSTOMER_PROVIDED",
  },
];

export const PAYMENT_OPTIONS = [
  { label: "Credit Card", value: "CC" },
  { label: "Electronic Check", value: "ACH" },
  { label: "Subscriber Payment", value: "SUB" },
  { label: "Pay at Pickup", value: "PAY_AT_PICKUP" },
];

export const TEL_REGEX_PATTERN = "[0-9]{3}-[0-9]{3}-[0-9]{4}";

export const RECAPTCHA_SITE_KEY = "6Lf8GP8SAAAAAFx2H53RtfDO18x7S1q_0pGNdmbd";

export const BASE_URL = "https://stagingapi.tnris.org"

export const LIDAR_FORMATS = [
  { label: 'Hypsography', value: "HYPS" },
  { label: 'Digital Elevation Model (DEM)', value: "DEM" },
  { label: 'LAZ Point Cloud (Compressed)', value: "LAZ" },
  { label: 'LAS Point Cloud (Uncompressed)', value: "LAS" },
  { label: 'Breaklines', value: "BREAK" }
]