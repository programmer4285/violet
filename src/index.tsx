import "@opentui/solid/runtime-plugin-support";
import { render } from "@opentui/solid";
import { createSignal, Match, Switch } from "solid-js";
import { KeyValueEditor } from "./components/KeyValueEditor";

const borderDefault = "#FFFFFF";
const borderFocus = "#8F00FF";
const borderStyle = "rounded";
const backgroundFocus = borderFocus;
const backgroundDefault = "transparent";

enum Pane {
  METHOD = "method",
  URL = "url",
  REQUEST = "request",
}

enum RequestTab {
  HEADERS = "headers",
  PARAMS = "params",
  BODY = "body",
}

const [selectedPane, setSelectedPane] = createSignal<Pane>(Pane.METHOD);
const [selectedRequestTab, setSelectedRequestTab] = createSignal<RequestTab>(RequestTab.HEADERS);

function getBorderColor(pane: Pane): string {
  return selectedPane() === pane ? borderFocus : borderDefault;
}

function getBackgroundColor(tab: RequestTab): string {
  return selectedRequestTab() === tab ? backgroundFocus : backgroundDefault;
}

function App() {
  return (
    <box flexDirection="row" flexGrow={1}>
      <box width="50%" flexGrow={1}>
        <box flexDirection="row">
          <box
            borderStyle={borderStyle}
            borderColor={getBorderColor(Pane.METHOD)}
            title="Method"
            width="20%"
          >
            <input placeholder="GET" onMouseDown={() => setSelectedPane(Pane.METHOD)} marginX={1} />
          </box>
          <box
            borderStyle={borderStyle}
            borderColor={getBorderColor(Pane.URL)}
            title="URL"
            width="100%"
          >
            <input
              placeholder="https://example.com"
              onMouseDown={() => setSelectedPane(Pane.URL)}
              marginX={1}
            />
          </box>
        </box>
        <box borderStyle={borderStyle} borderColor={getBorderColor(Pane.REQUEST)} flexGrow={1}>
          <box flexDirection="row" width="100%">
            <box backgroundColor={getBackgroundColor(RequestTab.HEADERS)}>
              <text
                onMouseDown={() => {
                  setSelectedPane(Pane.REQUEST);
                  setSelectedRequestTab(RequestTab.HEADERS);
                }}
                marginX={1}
              >
                Headers
              </text>
            </box>
            <box backgroundColor={getBackgroundColor(RequestTab.PARAMS)}>
              <text
                onMouseDown={() => {
                  setSelectedPane(Pane.REQUEST);
                  setSelectedRequestTab(RequestTab.PARAMS);
                }}
                marginX={1}
              >
                Parameters
              </text>
            </box>
            <box backgroundColor={getBackgroundColor(RequestTab.BODY)}>
              <text
                onMouseDown={() => {
                  setSelectedPane(Pane.REQUEST);
                  setSelectedRequestTab(RequestTab.BODY);
                }}
                marginX={1}
              >
                Body
              </text>
            </box>
          </box>
          <box flexGrow={1} marginTop={1} marginX={1}>
            <Switch>
              <Match when={selectedRequestTab() === RequestTab.HEADERS}>
                <KeyValueEditor
                  onMouseDown={() => setSelectedPane(Pane.REQUEST)}
                  rows={[
                    {
                      id: crypto.randomUUID(),
                      key: "Accept",
                      value: "application/json",
                    },
                  ]}
                />
              </Match>
              <Match when={selectedRequestTab() === RequestTab.PARAMS}>
                <KeyValueEditor
                  onMouseDown={() => setSelectedPane(Pane.REQUEST)}
                  rows={[
                    {
                      id: crypto.randomUUID(),
                      key: "count",
                      value: "true",
                    },
                  ]}
                />
              </Match>
              <Match when={selectedRequestTab() === RequestTab.BODY}>
                <box flexGrow={1} borderStyle="rounded">
                  <textarea initialValue={'{"name": "john"}'} />
                </box>
              </Match>
            </Switch>
          </box>
        </box>
      </box>
      <box borderStyle={borderStyle} title="Response" width="50%" flexGrow={1}>
        <text marginX={1}>{'{"ok": true}'}</text>
      </box>
    </box>
  );
}

await render(App);
