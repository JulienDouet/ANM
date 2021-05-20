import "./Map.css";

export const Map = (props) => {
    const { mapArray, isStoredMap, mapName, MAPPATH } = props;

    return (
        <div>
            <table cellSpacing="0" cellPadding="0" style={{ border: "none" }}>
                <tbody>
                    {mapArray.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                    return (
                                        <td
                                            key={cellIndex}
                                            style={{
                                                backgroundImage: isStoredMap
                                                    ? `url(${MAPPATH}/cartes/${mapName}/openstreetmap/${cell[1]}_${cell[2]}.png)`
                                                    : `url(https://a.tile.openstreetmap.fr/osmfr/${cell[0]}/${cell[1]}/${cell[2]}.png)`
                                            }}
                                        >
                                            <img
                                                src={
                                                    isStoredMap
                                                        ? `url(${MAPPATH}/cartes/${mapName}/openstreetmap/${cell[1]}_${cell[2]}.png)`
                                                        : `https://tiles.openseamap.org/seamark/${cell[0]}/${cell[1]}/${cell[2]}.png`
                                                }
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
