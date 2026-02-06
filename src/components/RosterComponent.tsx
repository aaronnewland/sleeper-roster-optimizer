type RosterComponentProps = {
  rosterName: string;
  roster: Array<string>;
  playerNamesMap: Map<string, string>;
};

export default function RosterComponent({
  rosterName,
  roster,
  playerNamesMap,
}: RosterComponentProps) {
  return (
    <>
      <p className="text-2xl">{rosterName}</p>
      {roster && roster[0] !== "0" ? (
        roster.map((player) => {
          return <p key={player}>{playerNamesMap?.get(player)}</p>;
        })
      ) : (
        <></>
      )}
    </>
  );
}
