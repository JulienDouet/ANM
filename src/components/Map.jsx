import "./Map.css";

export const Map = (props) => {
    const { mapArray } = props;

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
                                                backgroundImage: `url(https://a.tile.openstreetmap.fr/osmfr/${cell[0]}/${cell[1]}/${cell[2]}.png)`
                                            }}
                                        >
                                            <img
                                                src={`https://tiles.openseamap.org/seamark/${cell[0]}/${cell[1]}/${cell[2]}.png`}
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
