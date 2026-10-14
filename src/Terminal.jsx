import { useEffect, useRef, useState } from "react";
import { contact, projects, skills } from "./data";
import { scrollToId } from "./fx/motion";

const COMMANDS = ["help", "whoami", "projects", "ios", "web", "skills", "cv", "contact", "github", "linkedin", "goto", "clear", "exit", "sudo hire-me"];

const welcome = [
  { type: "out", text: "rovshan.dev — interactive shell" },
  { type: "out", text: 'Type "help" to see what you can do. Esc closes.' },
];

function run(raw, close) {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const lines = (arr) => arr.map((text) => ({ type: "out", text }));

  switch (cmd) {
    case "":
      return [];
    case "help":
      return lines([
        "whoami        who builds this site",
        "projects      list every project",
        "ios | web     filter projects by platform",
        "skills        the stack, iOS and web",
        "goto <id>     scroll to about, build, projects or contact",
        "cv            download the CV (PDF)",
        "contact       email and phone",
        "github        open GitHub",
        "linkedin      open LinkedIn",
        "clear         clear the screen",
        "exit          close the terminal",
      ]);
    case "whoami":
      return lines([
        "Rovshan Rzayev",
        "iOS Software Engineer (Swift, SwiftUI, UIKit) and frontend developer (React).",
        "Most recently: EPAM Systems, MyGov iOS app.",
      ]);
    case "projects":
    case "ios":
    case "web": {
      const list = cmd === "projects" ? projects : projects.filter((p) => p.type === cmd);
      return lines(list.map((p) => `${p.type === "ios" ? "[iOS]" : "[web]"} ${p.name}${p.note ? ` — ${p.note}` : ""}`));
    }
    case "skills":
      return lines([`iOS: ${skills.ios.join(", ")}`, `web: ${skills.web.join(", ")}`]);
    case "goto": {
      const id = args[0];
      if (!["about", "build", "projects", "contact", "top"].includes(id)) {
        return [{ type: "err", text: "goto needs one of: about, build, projects, contact" }];
      }
      close();
      setTimeout(() => (id === "top" ? window.scrollTo({ top: 0 }) : scrollToId(id)), 60);
      return lines([`→ ${id}`]);
    }
    case "cv": {
      const a = document.createElement("a");
      a.href = contact.cv;
      a.download = "Rovshan-Rzayev-CV.pdf";
      a.click();
      return lines(["Downloading Rovshan-Rzayev-CV.pdf"]);
    }
    case "contact":
      return lines([`email  ${contact.email}`, `phone  ${contact.phone}`]);
    case "github":
      window.open(contact.github, "_blank", "noopener");
      return lines([`Opening ${contact.github}`]);
    case "linkedin":
      window.open(contact.linkedin, "_blank", "noopener");
      return lines([`Opening ${contact.linkedin}`]);
    case "sudo":
      if (args.join(" ") === "hire-me") {
        window.location.href = `mailto:${contact.email}?subject=Let's%20work%20together`;
        return lines(["[sudo] permission granted. Opening your mail app…"]);
      }
      return [{ type: "err", text: "sudo: only one command is allowed here. Try: sudo hire-me" }];
    case "exit":
      close();
      return [];
    default:
      return [{ type: "err", text: `command not found: ${cmd}. Type "help" for the list.` }];
  }
}

export default function Terminal() {
  const dialog = useRef(null);
  const inputRef = useRef(null);
  const screen = useRef(null);
  const [log, setLog] = useState(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);

  const open = () => {
    const d = dialog.current;
    if (!d.open) d.showModal();
    setTimeout(() => inputRef.current?.focus(), 30);
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(document.activeElement?.tagName || "");
      if ((e.key === "`" || e.key === "~") && !typing) {
        e.preventDefault();
        dialog.current.open ? close() : open();
      }
    };
    const onOpen = () => open();
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-terminal", onOpen);
    };
  }, []);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [log]);

  const submit = (e) => {
    e.preventDefault();
    const input = value;
    if (input.trim() === "clear") {
      setLog([]);
    } else {
      setLog((l) => [...l, { type: "in", text: input }, ...run(input, close)]);
    }
    if (input.trim()) setHistory((h) => [input, ...h].slice(0, 30));
    setCursor(-1);
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) { setCursor(next); setValue(history[next]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(value.trim()) && value.trim());
      if (match) setValue(match);
    }
  };

  return (
    <dialog ref={dialog} className="terminal" aria-label="Interactive terminal" onClick={(e) => e.target === dialog.current && close()}>
      <div className="terminal_window">
        <div className="terminal_bar">
          <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          <span>rovshan@portfolio: ~</span>
          <button type="button" className="terminal_close" onClick={close} aria-label="Close terminal">esc</button>
        </div>
        <div className="terminal_screen" data-lenis-prevent ref={screen} onClick={() => inputRef.current?.focus()}>
          {log.map((l, i) => (
            <p key={i} className={`t-${l.type}`}>
              {l.type === "in" && <span className="t-prompt">❯ </span>}
              {l.text}
            </p>
          ))}
          <form onSubmit={submit} className="terminal_form">
            <label htmlFor="term-input" className="t-prompt">❯</label>
            <input
              id="term-input"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Command"
            />
          </form>
        </div>
      </div>
    </dialog>
  );
}
