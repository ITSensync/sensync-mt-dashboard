import { documentService } from "@/data/service";
import { getAuthToken } from "./sessions";

const listSparing = [
  {
    id: "sparing01",
    type: "sparing",
    site: "Gistex",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing02",
    type: "sparing",
    site: "Indorama Polyester",
    city: "Purwakarta",
    domisili: "Non Bandung",
    img: "",
  },
  {
    id: "sparing03",
    type: "sparing",
    site: "PMT",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing04",
    type: "sparing",
    site: "Innojaya Tekstil",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing05",
    type: "sparing",
    site: "Besland",
    city: "Purwakarta",
    domisili: "Non Bandung",
    img: "",
  },
  {
    id: "sparing06",
    type: "sparing",
    site: "Indotaisei",
    city: "Purwakarta",
    domisili: "Non Bandung",
    img: "",
  },
  {
    id: "sparing07",
    type: "sparing",
    site: "Daliatex",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing08",
    type: "sparing",
    site: "Papyrus",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing09",
    type: "sparing",
    site: "Bintang Cipta Perkasa",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing10",
    type: "sparing",
    site: "Sinar Pangjaya",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing11",
    type: "sparing",
    site: "LPA",
    city: "Bekasi",
    domisili: "Non Bandung",
    img: "",
  },
  {
    id: "sparing12",
    type: "sparing",
    site: "Kertas Padalarang",
    city: "Bandung",
    domisili: "Bandung",
    img: "",
  },
  {
    id: "sparing13",
    type: "sparing",
    site: "Sinar Sukses Mandiri",
    city: "Purwakarta",
    domisili: "Non Bandung",
    img: "",
  },
  {
    id: "spinning",
    type: "sparing",
    site: "Spinning",
    city: "Purwakarta",
    domisili: "Non Bandung",
    img: "",
  },
  {
    id: "basebdg",
    type: "aqms",
    site: "DLH Kota Bandung",
    city: "Bandung",
    domisili: "",
    img: "",
  },
  {
    id: "basekrwg",
    type: "aqms",
    site: "DLH Kab. Karawang",
    city: "Karawang",
    domisili: "",
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

export const generateSiteType = (siteId: string) => {
  const site = listSparing.find((sparing) => sparing.id === siteId);
  return site ? site.type : "Unknown";
}

export const generateSiteDomisili = (siteId: string) => {
  const site = listSparing.find((sparing) => sparing.id === siteId);
  return site ? site.domisili : "Unknown";
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
