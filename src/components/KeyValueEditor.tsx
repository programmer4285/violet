import { For } from "solid-js";

export type KeyValueRow = {
  id: string;
  key: string;
  value: string;
};

export type Props = {
  rows: KeyValueRow[];
  onMouseDown: () => void;
};

export function KeyValueEditor(props: Props) {
  return (
    <box
      flexGrow={1}
      borderStyle="rounded"
      onMouseDown={() => props.onMouseDown()}
    >
      <box flexDirection="row" border={["bottom"]}>
        <box width="50%" border={["right"]} paddingX={1}>
          <text>Key</text>
        </box>
        <box width="50%" paddingX={1}>
          <text>Value</text>
        </box>
      </box>
      <For each={props.rows}>
        {(row) => (
          <box flexDirection="row" border={["bottom"]}>
            <box width="50%" border={["right"]} paddingX={1}>
              <input value={row.key} />
            </box>
            <box width="50%" paddingX={1}>
              <input value={row.value} />
            </box>
          </box>
        )}
      </For>
      <box flexDirection="row">
        <box width="50%" border={["right"]} paddingX={1}>
          <input placeholder="Add key…" />
        </box>
        <box width="50%" paddingX={1}>
          <input placeholder="Value" />
        </box>
      </box>
    </box>
  );
}
