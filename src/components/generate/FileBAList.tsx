"use client";

import { generateService } from "@/data/service";
import { getAuthToken, getIdDevice } from "@/lib/sessions";
import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { generateSiteData, normalizeSite } from "@/lib/generate";
import { FileGroup, FileResponse } from "../types/File";
import { DownloadIcon, EyeIcon } from "@/icons";
import { formatCreatedAtWib } from "@/lib/formatDate";



const defaultFolderPath = ["Maintenance Sparing Non Bandung", "SSM"];

export default function FileBAList({
  folderPath = defaultFolderPath,
}: {
  folderPath?: string[];
}) {
  const [groups, setGroups] = useState<FileGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const loadFileBA = async () => {
      const idDevice = await getIdDevice();
      const siteData = await generateSiteData(idDevice || "");
      const siteName = normalizeSite(siteData.site);
      const pathFolder: string[] = [`Berita Acara`, siteName];

      if (!idDevice) {
        setError("ID device tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const response = (await generateService.getFileBA(
          await getAuthToken(),
          {
            id_device: idDevice,
            folder_path: pathFolder,
          },
        )) as FileResponse;

        if (response.status !== 200) {
          setError(response.message || "Dokumentasi gagal dimuat.");
          return;
        }

        setGroups(response.data || []);
      } catch {
        setError("Dokumentasi gagal dimuat.");
      } finally {
        setLoading(false);
      }
    };

    loadFileBA();
  }, [folderPath]);

  const normalizedSearchName = searchName.trim().toLowerCase();
  const filteredGroups = groups
    .map((group) => ({
      ...group,
      data: group.data.filter((file) =>
        file.name.toLowerCase().includes(normalizedSearchName),
      ),
    }))
    .filter((group) => group.data.length > 0);

  const handleSearchName = (value: string) => {
    setSearchName(value);
  };

  return (
    <ComponentCard
      title="File Berita Acara Tersimpan"
      desc="Berita acara dikelompokan berdasarkan tipe pemeliharaan."
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="search-dokumentasi-date"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Cari file
        </label>
        <input
          id="search-dokumentasi-date"
          type="search"
          value={searchName}
          onChange={(event) => handleSearchName(event.target.value)}
          placeholder="Contoh: ba_xxx_xxx"
          className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-700 outline-none transition focus:border-brand-500 sm:max-w-xs dark:border-gray-700 dark:text-gray-300"
        />
      </div>

      {loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Memuat file...
        </p>
      )}

      {!loading && error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && filteredGroups.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {groups.length === 0
            ? "Belum ada file untuk device ini."
            : "Tidak ada file dengan nama tersebut."}
        </p>
      )}

      {!loading && !error && filteredGroups.length > 0 && (
        <div className="space-y-8">
          {filteredGroups.map((group) => (
            <section key={group.parent}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="font-semibold text-gray-800 dark:text-white/90">
                  {group.parent}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {group.data.length} file
                </span>
              </div>

              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-medium">No</th>
                      <th scope="col" className="px-4 py-3 font-medium">Nama File</th>
                      <th scope="col" className="px-4 py-3 font-medium">Tanggal</th>
                      <th scope="col" className="px-4 py-3 text-right font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {group.data.map((file, index) => {
                      const previewUrl = file.publicUrl;
                      const downloadedUrl = file.url;

                      return (
                        <tr key={file.id} className="text-gray-700 dark:text-gray-300">
                          <td className="whitespace-nowrap px-4 py-3">{index + 1}</td>
                          <td className="max-w-[280px] truncate px-4 py-3 font-medium" title={file.name}>
                            {file.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            {formatCreatedAtWib(file.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-3">
                              <a
                                href={previewUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Preview ${file.name}`}
                                title="Preview"
                                className="text-blue-600 transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <EyeIcon className="size-5 fill-current" />
                              </a>
                              <a
                                href={downloadedUrl}
                                download={file.name}
                                aria-label={`Download ${file.name}`}
                                title="Download"
                                className="text-green-600 transition hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                              >
                                <DownloadIcon className="size-5 fill-current" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </ComponentCard>
  );
}
