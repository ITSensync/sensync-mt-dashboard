import { documentService } from "@/data/service";
import { getAuthToken } from "./sessions";

const listSparing = [
  {
    id: "sparing01",
    site: "Gistex",
    img: "",
  },
  {
    id: "sparing02",
    site: "Indorama PWK",
    img: "",
  },
  {
    id: "sparing03",
    site: "PMT",
    img: "",
  },
  {
    id: "sparing04",
    site: "Innojaya PDL",
    img: "",
  },
  {
    id: "sparing05",
    site: "Besland",
    img: "",
  },
  {
    id: "sparing06",
    site: "Indotaisei",
    img: "",
  },
  {
    id: "sparing07",
    site: "Daliatex",
    img: "",
  },
  {
    id: "sparing08",
    site: "Papyrus",
    img: "",
  },
  {
    id: "sparing09",
    site: "BCP",
    img: "",
  },
  {
    id: "sparing10",
    site: "Pangjaya",
    img: "",
  },
  {
    id: "sparing11",
    site: "LPA",
    img: "",
  },
  {
    id: "sparing12",
    site: "Kertas PDL",
    img: "",
  },
  {
    id: "sparing13",
    site: "SSM",
    img: "",
  },
  {
    id: "basebdg",
    site: "DLH Kota Bandung",
    img: "",
  },
  {
    id: "basekrwg",
    site: "DLH Kab. Karawang",
    img: "",
  },
];

export const generateSiteName = (siteId: string) => {
  const site = listSparing.find((sparing) => sparing.id === siteId);
  return site ? site.site : "Unknown";
};

export const generateBANumber = async () => {
  const authToken = await getAuthToken();
  const response = await documentService.getLatestNumber(authToken);
  if (response.data) {
    const nomorBA = response.data.no_ba;
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const romawi = [
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
    ];

    return `${nomorBA}/BA/STI/${romawi[month]}/${year}`;
  } else {
    console.log("Error:", response.message);
  }
};
