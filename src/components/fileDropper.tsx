import ExcelJS from "exceljs";
import type { useState, ChangeEvent } from "react";

import { type PlayerSpreadsheetVals } from "@/types/sleeperAPITypes";

const newPlayerMap = new Map<string, PlayerSpreadsheetVals>();

export default function FileDropper() {
  const [playerMap, setPlayerMap] = useState<
    Map<string, PlayerSpreadsheetVals>
  >(new Map());
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // console.log(file);
      const workbook = new ExcelJS.Workbook();
      const reader = new FileReader();
      const PositionColumns = {
        QB_RANK: 1,
        QUARTERBACK: 2,
        QB_TIER: 7,
        RB_RANK: 8,
        RUNNING_BACK: 9,
        RB_TIER: 14,
        WR_RANK: 15,
        WIDE_RECEIVER: 16,
        WR_TIER: 21,
        TE_RANK: 22,
        TIGHT_END: 23,
        TE_TIER: 28,
        DEF_RANK: 29,
        DEFENSE: 30,
        DEF_TIER: 33,
      } as const;

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const buffer = reader.result;
        if (buffer && buffer instanceof ArrayBuffer) {
          workbook.xlsx.load(buffer as ArrayBuffer).then((wb) => {
            // console.log(wb);
            const sheet = wb.getWorksheet(1);
            sheet?.eachRow((row) => {
              const qbRank = row.getCell(PositionColumns.QB_RANK).value;
              const qb = row.getCell(PositionColumns.QUARTERBACK).value;
              const qbTier = row.getCell(PositionColumns.QB_TIER).value;

              const rbRank = row.getCell(PositionColumns.RB_RANK).value;
              const rb = row.getCell(PositionColumns.RUNNING_BACK).value;
              const rbTier = row.getCell(PositionColumns.RB_TIER).value;

              const wrRank = row.getCell(PositionColumns.WR_RANK).value;
              const wr = row.getCell(PositionColumns.WIDE_RECEIVER).value;
              const wrTier = row.getCell(PositionColumns.WR_TIER).value;

              const teRank = row.getCell(PositionColumns.TE_RANK).value;
              const te = row.getCell(PositionColumns.TIGHT_END).value;
              const teTier = row.getCell(PositionColumns.TE_TIER).value;

              const defRank = row.getCell(PositionColumns.DEF_RANK).value;
              const def = row.getCell(PositionColumns.DEFENSE).value;
              const defTier = row.getCell(PositionColumns.DEF_TIER).value;

              if (
                qbRank &&
                qb &&
                qbTier &&
                String(qb).toLowerCase() !== "quarterback"
              ) {
                // console.log(qbRank, String(qb), qbTier);
                newPlayerMap.set(String(qb), {
                  position: "QB",
                  rank: Number(qbRank),
                  tier: Number(qbTier),
                });
              }

              if (
                rbRank &&
                rb &&
                rbTier &&
                String(rb).toLowerCase() !== "running back"
              ) {
                newPlayerMap.set(String(rb), {
                  position: "RB",
                  rank: Number(rbRank),
                  tier: Number(rbTier),
                });
              }

              if (
                wrRank &&
                wr &&
                wrTier &&
                String(wr).toLowerCase() !== "wide receiver"
              ) {
                newPlayerMap.set(String(wr), {
                  position: "WR",
                  rank: Number(wrRank),
                  tier: Number(wrTier),
                });
              }

              if (
                teRank &&
                te &&
                teTier &&
                String(te).toLowerCase() !== "tight end"
              ) {
                newPlayerMap.set(String(te), {
                  position: "TE",
                  rank: Number(teRank),
                  tier: Number(teTier),
                });
              }

              if (
                defRank &&
                def &&
                defTier &&
                String(def).toLowerCase() !== "defense"
              ) {
                newPlayerMap.set(String(def), {
                  position: "DEF",
                  rank: Number(defRank),
                  tier: Number(defTier),
                });
              }
            });

            // newPlayerMap.forEach((key, val) => console.log(key, val));
            setPlayerMap(newPlayerMap);
          });
        }
      };
    }
  }

  return (
    <>
      <h1>File Reader</h1>
      <input type="file" id="file-input" onChange={handleFileChange} />
    </>
  );
}
