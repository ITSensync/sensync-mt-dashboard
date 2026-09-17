"use client";

import { dokumentasiService } from "@/data/service";
import { getAuthToken, getIdDevice } from "@/lib/sessions";
import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Image from "next/image";
import { generateSiteData, normalizeSite } from "@/lib/generate";
import { FileGroup, FileResponse } from "../types/File";

const defaultFolderPath = ["Maintenance Sparing Non Bandung", "SSM"];
const groupsPerPage = 3;

export default function DokumentasiList({
  folderPath = defaultFolderPath,
}: {
  folderPath?: string[];
}) {
  const [groups, setGroups] = useState<FileGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadDokumentasi = async () => {
      const idDevice = await getIdDevice();
      const siteData = await generateSiteData(idDevice || "");
      const pathFolder: string[] = [];
      const siteName = normalizeSite(siteData.site);
      if (siteData.type === "sparing") {
        pathFolder.push(`Maintenance Sparing ${siteData.domisili}`);
        pathFolder.push(siteName);
      } else if (siteData.type === "aqms") {
        pathFolder.push(`AQMS ${siteName}`);
      } else if (siteData.type === "aqms_mini") {
        pathFolder.push('Mini Partikulat');
        pathFolder.push(siteName);
      }

      if (!idDevice) {
        setError("ID device tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const response = (await dokumentasiService.getDokumentasi(
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

    loadDokumentasi();
  }, [folderPath]);

  const filteredGroups = groups.filter((group) =>
    group.parent.toLowerCase().includes(searchDate.trim().toLowerCase()),
  );
  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);
  const visibleGroups = filteredGroups.slice(
    (currentPage - 1) * groupsPerPage,
    currentPage * groupsPerPage,
  );

  const handleSearchDate = (value: string) => {
    setSearchDate(value);
    setCurrentPage(1);
  };

  return (
    <ComponentCard
      title="Dokumentasi Tersimpan"
      desc="Foto pemeliharaan dikelompokkan berdasarkan tanggal pengambilan."
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="search-dokumentasi-date"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Cari tanggal
        </label>
        <input
          id="search-dokumentasi-date"
          type="search"
          value={searchDate}
          onChange={(event) => handleSearchDate(event.target.value)}
          placeholder="Contoh: 1 Juli 2026"
          className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-700 outline-none transition focus:border-brand-500 sm:max-w-xs dark:border-gray-700 dark:text-gray-300"
        />
      </div>

      {loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Memuat dokumentasi...
        </p>
      )}

      {!loading && error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && filteredGroups.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {groups.length === 0
            ? "Belum ada dokumentasi untuk device ini."
            : "Tidak ada dokumentasi pada tanggal tersebut."}
        </p>
      )}

      {!loading && !error && visibleGroups.length > 0 && (
        <div className="space-y-8">
          {visibleGroups.map((group) => (
            <section key={group.parent}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="font-semibold text-gray-800 dark:text-white/90">
                  {group.parent}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {group.data.length} foto
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.data.map((photo) => {
                  const originalUrl = photo.publicUrl;
                  console.log(originalUrl);

                  return (
                    <a
                      key={photo.id}
                      href={originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                      title={`Buka ${photo.name}`}
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={originalUrl}
                          width={320}
                          height={320}
                          quality={60}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          alt={photo.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </div>
                      <p className="truncate px-2 py-2 text-xs text-gray-600 dark:text-gray-300">
                        {photo.name}
                      </p>
                    </a>
                  );
                })}
              </div>
            </section>
          ))}

          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn-sm btn-outline"
              >
                Sebelumnya
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="btn btn-sm btn-outline"
              >
                Berikutnya
              </button>
            </div>
          )}
        </div>
      )}
    </ComponentCard>
  );
}
