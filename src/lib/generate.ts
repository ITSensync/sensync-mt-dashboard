import { documentService } from "@/data/service";
import { getAuthToken } from "./sessions";

const listSite = [
  {
    id: "sparing01",
    type: "sparing",
    site: "Gistex",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing02",
    type: "sparing",
    site: "Indorama Polyester",
    city: "Purwakarta",
    domisili: "Non Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing03",
    type: "sparing",
    site: "PMT",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing04",
    type: "sparing",
    site: "Innojaya Tekstil",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing05",
    type: "sparing",
    site: "Besland Pertiwi",
    city: "Purwakarta",
    domisili: "Non Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing06",
    type: "sparing",
    site: "Indotaisei",
    city: "Purwakarta",
    domisili: "Non Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing07",
    type: "sparing",
    site: "Daliatex",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing08",
    type: "sparing",
    site: "Papyrus Sakti",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing09",
    type: "sparing",
    site: "Bintang Cipta Perkasa",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing10",
    type: "sparing",
    site: "Sinar Pangjaya",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing11",
    type: "sparing",
    site: "LPA",
    city: "Bekasi",
    domisili: "Non Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing12",
    type: "sparing",
    site: "Kertas Padalarang",
    city: "Bandung",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing13",
    type: "sparing",
    site: "Sinar Sukses Mandiri",
    city: "Purwakarta",
    domisili: "Non Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing14",
    type: "sparing",
    site: "Sari Dumai Oleo",
    city: "Jakarta",
    domisili: "Non Bandung",
    address: "",
    img: "",
  },
  {
    id: "sparing15",
    type: "sparing",
    site: "Ayoe Indotama Textile",
    city: "Cimahi",
    domisili: "Bandung",
    address: "",
    img: "",
  },
  {
    id: "spinning",
    type: "sparing",
    site: "Indorama Synthetics Div. Spinning",
    city: "Purwakarta",
    domisili: "Non Bandung",
    address: "",
    img: "",
  },
  {
    id: "basebdg",
    type: "aqms",
    site: "DLH Kota Bandung",
    city: "Bandung",
    domisili: "",
    address:
      "Jl. Sersan Bajuri No.5, Isola, Kec. Sukasari, Kota Bandung, Jawa Barat 40154",
    img: "",
  },
  {
    id: "basekrwg",
    type: "aqms",
    site: "DLH Kab. Karawang",
    city: "Karawang",
    domisili: "",
    address: "",
    img: "",
  },
  {
    id: "mini01",
    type: "aqms",
    site: "Pertiwi Lestari",
    city: "Karawang",
    domisili: "",
    address: "",
    img: "",
  },
];

export const generateSiteData = (siteId: string) => {
  const site = listSite.find((s) => s.id === siteId);

  if (!site) {
    return {
      id: "Unknown",
      type: "Unknown",
      site: "Unknown",
      city: "Unknown",
      domisili: "Unknown",
      address: "",
      img: "",
    };
  }

  return site;
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
