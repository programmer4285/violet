import { render } from "@opentui/solid";

const borderFocus = "#8F00FF";
const borderStyle = "rounded";

function App() {
  return (
    <box flexDirection="row">
      <box width="50%" flexGrow={1}>
        <box flexDirection="row" flexGrow={1}>
          <box
            borderStyle={borderStyle}
            focusedBorderColor={borderFocus}
            title="Method"
            width="20%"
          >
            <textarea initialValue="GET" />
          </box>
          <box
            borderStyle={borderStyle}
            focusedBorderColor={borderFocus}
            title="URL"
            width="100%"
          >
            <textarea initialValue="https://example.com" />
          </box>
        </box>
        <box borderStyle={borderStyle} focusedBorderColor={borderFocus}>
          <tab_select
            width="100%"
            showDescription={false}
            selectedTextColor="8F00FF"
            focusedBackgroundColor="transparent"
            options={[
              { name: "Headers", description: "" },
              { name: "Parameters", description: "" },
              { name: "Body", description: "" },
            ]}
          ></tab_select>
        </box>
      </box>
      <box
        borderStyle={borderStyle}
        focusedBorderColor={borderFocus}
        title="Response"
        width="50%"
        flexGrow={1}
      >
        <text>{'{"ok": true}'}</text>
      </box>
    </box>
  );
}

await render(App);
