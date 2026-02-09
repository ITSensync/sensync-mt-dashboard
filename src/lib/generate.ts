import { documentService } from "@/data/service";
import { getAuthToken } from "./sessions";

const listSparing = [
  {
    id: "sparing01",
    site: "Gistex",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing02",
    site: "Indorama Polyester",
    city: "Purwakarta",
    img: "",
  },
  {
    id: "sparing03",
    site: "PMT",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing04",
    site: "Innojaya Tekstil",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing05",
    site: "Besland",
    city: "Purwakarta",
    img: "",
  },
  {
    id: "sparing06",
    site: "Indotaisei",
    city: "Purwakarta",
    img: "",
  },
  {
    id: "sparing07",
    site: "Daliatex",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing08",
    site: "Papyrus",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing09",
    site: "BCP",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing10",
    site: "Pangjaya",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing11",
    site: "LPA",
    city: "Bekasi",
    img: "",
  },
  {
    id: "sparing12",
    site: "Kertas Padalarang",
    city: "Bandung",
    img: "",
  },
  {
    id: "sparing13",
    site: "Sinar Sukses Mandiri",
    city: "Purwakarta",
    img: "",
  },
  {
    id: "basebdg",
    site: "DLH Kota Bandung",
    city: "Bandung",
    img: "",
  },
  {
    id: "basekrwg",
    site: "DLH Kab. Karawang",
    city: "Karawang",
    img: "",
  },
];

export const generateSiteName = (siteId: string) => {
  const site = listSparing.find((sparing) => sparing.id === siteId);
  return site ? site.site : "Unknown";
};

export const generateSiteCity = (siteId: string) => {
  const site = listSparing.find((sparing) => sparing.id === siteId);
  return site ? site.city : "Unknown";
}

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
