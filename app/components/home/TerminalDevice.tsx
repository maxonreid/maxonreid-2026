'use client';

import { useEffect, useRef, useState } from 'react';

export default function TerminalDevice() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermInstance = useRef<any>(null);
  const commandBarRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !terminalRef.current) return;

    // Dynamic import to avoid SSR issues
    import('xterm').then(({ Terminal }) => {
      import('xterm-addon-fit').then(({ FitAddon }) => {
        if (!terminalRef.current) return;

        // Create terminal instance
        const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"IBM Plex Mono", monospace',
      fontSize: 13,
      disableStdin: true,
      scrollback: 300,
      allowTransparency: true,
      theme: {
        background: 'transparent',
        foreground: '#00ff9f',
        cursor: '#ff007f',
        cursorAccent: '#00ff9f',
        selectionBackground: 'rgba(0,255,159,0.18)',
        black: '#0a0e14',
        red: '#ff3366',
        green: '#00ff9f',
        yellow: '#ffcc00',
        blue: '#00d4ff',
        magenta: '#ff007f',
        cyan: '#00ffff',
        white: '#e6e7ea',
        brightBlack: '#4a5568',
        brightRed: '#ff5588',
        brightGreen: '#33ffbb',
        brightYellow: '#ffdd33',
        brightBlue: '#33e6ff',
        brightMagenta: '#ff33aa',
        brightCyan: '#66ffff',
        brightWhite: '#ffffff',
      },
    });

    // Create and load fit addon
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // Open terminal
    term.open(terminalRef.current);

    // Fit terminal to container
    const tryFit = () => {
      try {
        fitAddon.fit();
      } catch (e) {
        // Ignore fit errors
      }
    };

    tryFit();
    requestAnimationFrame(tryFit);
    setTimeout(tryFit, 80);

    // Handle window resize
    const handleResize = () => tryFit();
    window.addEventListener('resize', handleResize);

    // Store instance
    xtermInstance.current = term;

    // Run initial demo, then install commands
    runInitialDemo(term).then(() => {
      installInteractiveCommands(term, writeTyped);
    });

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          term.dispose();
        };
      });
    });
  }, [isMounted]);

  // Helper function to write typed effect
  const writeTyped = (
    term: any,
    text: string,
    delay = 12
  ): Promise<void> => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      term.writeln(text.replace(/\r?\n$/, ''));
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        const ch = text[i];
        if (ch === '\n') {
          term.write('\r\n');
        } else {
          term.write(ch);
        }
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  };

  // Random latency helper
  const randomLatency = (min = 12, max = 120) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Initial demo animation
  const runInitialDemo = async (term: any) => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const localWrite = (text: string, delay = 12) => {
      if (reduceMotion) {
        term.writeln(text.replace(/\r?\n$/, ''));
        return Promise.resolve();
      }
      return writeTyped(term, text, delay);
    };

    term.clear();
    await localWrite('\x1b[1;96m>>> SYSTEM PROFILE LOADED <<<\x1b[0m\r\n', 10);
    term.writeln('');
    await localWrite('\x1b[96m▸ Name:\x1b[0m \x1b[93mMaxon Reid\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Nationality:\x1b[0m \x1b[93mMexican\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Birthday:\x1b[0m \x1b[93mJuly 24th, 1993\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Role:\x1b[0m \x1b[92mFull-Stack Web Developer\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Current:\x1b[0m \x1b[95mVientiane, Laos\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Worked in:\x1b[0m \x1b[36mThailand · China · Laos\x1b[0m\r\n', 10);
    term.writeln('');

    await localWrite('\x1b[93m[*] Initializing secure channel…\x1b[0m\r\n', 16);
    await sleep(320);
    await localWrite('\x1b[92m[✓] Handshake complete — AES-256\x1b[0m\r\n', 12);
    await sleep(260);
    await localWrite(
      '\x1b[95m[DEPLOY]\x1b[0m maxon-reid/launch-kit \x1b[92m— SUCCESS\x1b[0m \x1b[90m(2026-02-07 10:18 UTC)\x1b[0m\r\n',
      12
    );
    await sleep(260);
    await localWrite(
      '\x1b[36m[METRICS]\x1b[0m Latency: \x1b[93m34ms\x1b[0m | Uptime: \x1b[92m99.99%\x1b[0m | Throughput: \x1b[96m12k req/min\x1b[0m\r\n',
      12
    );
    await sleep(900);
    await localWrite(
      '\x1b[1;92m[STATUS]\x1b[0m \x1b[93mAVAILABLE\x1b[0m — \x1b[96mREMOTE\x1b[0m | LOCATION: \x1b[95mVientiane, Laos\x1b[0m\r\n',
      10
    );
    term.writeln('');
  };

  // Install interactive commands after demo
  const installInteractiveCommands = async (term: any, writeTypedFn: any) => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const writeTypedLocal = (text: string, delay = 12) => {
      if (reduceMotion) {
        term.writeln(text.replace(/\r?\n$/, ''));
        return Promise.resolve();
      }
      return writeTypedFn(term, text, delay);
    };

    const runCommandTyped = (command: string, outputFn: () => Promise<void>) => {
      return writeTypedLocal(`\x1b[33m> ${command}\x1b[0m\r\n`, 8).then(() => {
        if (typeof outputFn === 'function') return outputFn();
      });
    };

    // Command handlers
    const handlers: Record<string, (args: string[]) => Promise<void>> = {
      help: async () => {
        await writeTypedLocal('\x1b[1;95m>>> AVAILABLE COMMANDS <<<\x1b[0m\r\n', 8);
        term.writeln('');
        await writeTypedLocal('\x1b[92m▸ help\x1b[0m            \x1b[90m—\x1b[0m \x1b[96mshow this help\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ profile\x1b[0m         \x1b[90m—\x1b[0m \x1b[96mshow profile summary\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ projects\x1b[0m        \x1b[90m—\x1b[0m \x1b[96mlist projects\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ services\x1b[0m        \x1b[90m—\x1b[0m \x1b[96mlist services offered\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ contact\x1b[0m         \x1b[90m—\x1b[0m \x1b[96mshow contact info\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ ping\x1b[0m \x1b[93m<host>\x1b[0m     \x1b[90m—\x1b[0m \x1b[96msimulate ping\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ deploy\x1b[0m \x1b[93m<name>\x1b[0m   \x1b[90m—\x1b[0m \x1b[96msimulate deploy\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ whoami\x1b[0m          \x1b[90m—\x1b[0m \x1b[96mshow client info\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ clear\x1b[0m           \x1b[90m—\x1b[0m \x1b[96mclear terminal\x1b[0m\r\n', 6);
        term.writeln('');
      },

      profile: async () => {
        await writeTypedLocal('\x1b[1;93m>>> USER PROFILE <<<\x1b[0m\r\n', 10);
        term.writeln('');
        await writeTypedLocal('\x1b[96m▸ Name:\x1b[0m \x1b[93mMaxon Reid\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Role:\x1b[0m \x1b[92mFull-Stack Web Developer\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Location:\x1b[0m \x1b[95mVientiane, Laos\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Specialties:\x1b[0m \x1b[36mSaaS · Security · Performance\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Availability:\x1b[0m \x1b[92mRemote / Consultancy\x1b[0m\r\n', 8);
        term.writeln('');
      },

      projects: async () => {
        const cards = Array.from(document.querySelectorAll('.project-card'));
        if (!cards.length) {
          await writeTypedLocal('No projects found on the page.\r\n', 8);
          return;
        }
        await writeTypedLocal('\r\nProjects:\r\n', 8);
        for (const c of cards) {
          const title = (c as HTMLElement).dataset.title || (c.querySelector('.project-title')?.textContent?.trim()) || 'Untitled';
          const year = (c as HTMLElement).dataset.year || (c.querySelector('.project-date')?.textContent?.trim()) || '';
          const desc = (c as HTMLElement).dataset.desc || (c.querySelector('.project-desc')?.textContent?.trim()) || '';
          await writeTypedLocal(`  • ${title} ${year ? `(${year})` : ''}\r\n`, 6);
          if (desc) await writeTypedLocal(`      ${desc}\r\n`, 5);
        }
        term.writeln('');
      },

      services: async () => {
        const svcEls = Array.from(document.querySelectorAll('.service-card h3'));
        if (!svcEls.length) {
          await writeTypedLocal('No services found on the page.\r\n', 8);
          return;
        }
        await writeTypedLocal('\r\nServices (summary):\r\n', 8);
        for (const h of svcEls) {
          const title = h.textContent?.trim() || '';
          const card = h.closest('.service-card');
          const lead = card?.querySelector('.short')?.textContent?.trim() ||
                       card?.querySelector('p')?.textContent?.trim() || '';
          await writeTypedLocal(`  • ${title}\r\n`, 6);
          if (lead) await writeTypedLocal(`      ${lead}\r\n`, 5);
        }
        term.writeln('');
      },

      contact: async () => {
        const email = document.querySelector('.contact-card a[href^="mailto:"]')?.textContent?.trim() || 'hello@maxonreid.com';
        const phone = document.querySelector('.contact-card a[href^="tel:"]')?.textContent?.trim() || '';
        const locationCards = Array.from(document.querySelectorAll('.contact-card'));
        const location = locationCards.find(c => c.textContent?.includes('LOCATION'))?.querySelector('.contact-value')?.textContent?.trim() || '';
        await writeTypedLocal('\r\nContact:\r\n', 8);
        await writeTypedLocal(`  Email: ${email}\r\n`, 6);
        if (phone) await writeTypedLocal(`  Phone: ${phone}\r\n`, 6);
        if (location) await writeTypedLocal(`  Location: ${location}\r\n`, 6);
        term.writeln('');
      },

      ping: async (args: string[]) => {
        const host = args[0] || 'edge.example';
        await writeTypedLocal(`\r\nPING ${host} (${host}) 56(84) bytes of data.\r\n`, 8);
        await new Promise(r => setTimeout(r, 250));
        const latency = randomLatency();
        await writeTypedLocal(`64 bytes from ${host}: icmp_seq=1 ttl=54 time=${latency} ms\r\n`, 8);
        await writeTypedLocal(`--- ${host} ping statistics ---\r\n`, 8);
        await writeTypedLocal(`1 packets transmitted, 1 received, 0% packet loss, time 0ms\r\n`, 8);
        term.writeln('');
      },

      deploy: async (args: string[]) => {
        const name = args[0] || 'demo-app';
        await writeTypedLocal(`\r\nStarting deploy: ${name}\r\n`, 8);
        await writeTypedLocal('> building…\r\n', 10);
        await new Promise(r => setTimeout(r, 700));
        await writeTypedLocal('> running tests…\r\n', 10);
        await new Promise(r => setTimeout(r, 900));
        await writeTypedLocal('\x1b[32m> SUCCESS: build & tests passed\x1b[0m\r\n', 10);
        await writeTypedLocal(`> rolling out ${name} to prod…\r\n`, 10);
        await new Promise(r => setTimeout(r, 700));
        await writeTypedLocal('\x1b[32m> DEPLOY OK — ' + new Date().toISOString() + '\x1b[0m\r\n', 10);
        term.writeln('');
      },

      clear: async () => {
        term.clear();
      },

      whoami: async () => {
        const ua = navigator.userAgent || 'unknown';
        const platform = navigator.platform || 'unknown';
        const languages = navigator.languages ? navigator.languages.join(', ') : (navigator.language || 'unknown');
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const online = navigator.onLine ? 'online' : 'offline';
        const cookies = navigator.cookieEnabled ? 'enabled' : 'disabled';
        const timezone = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown' : 'unknown';
        const viewport = `${window.innerWidth}×${window.innerHeight}`;
        const now = new Date().toLocaleString();

        await writeTypedLocal('User client info:\r\n', 8);
        await writeTypedLocal(`  User Agent: ${ua}\r\n`, 6);
        await writeTypedLocal(`  Platform: ${platform}\r\n`, 6);
        await writeTypedLocal(`  Languages: ${languages}\r\n`, 6);
        await writeTypedLocal(`  Timezone: ${timezone}\r\n`, 6);
        await writeTypedLocal(`  Viewport: ${viewport}\r\n`, 6);
        await writeTypedLocal(`  Theme: ${theme}\r\n`, 6);
        await writeTypedLocal(`  Online: ${online}\r\n`, 6);
        await writeTypedLocal(`  Cookies: ${cookies}\r\n`, 6);
        await writeTypedLocal(`  Local time: ${now}\r\n`, 6);
        term.writeln('');
      }
    };

    const execCommandLine = async (line: string) => {
      const parts = (line || '').trim().split(/\s+/).filter(Boolean);
      if (parts.length === 0) return;
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      if (handlers[cmd]) {
        await runCommandTyped(line, () => handlers[cmd](args));
      } else {
        await runCommandTyped(line, async () => {
          await writeTypedLocal(`Command not found: ${cmd}\r\n`, 8);
          await writeTypedLocal('Type "help" to list available commands.\r\n', 8);
        });
      }
    };

    // Build command bar
    const buildCommandBar = () => {
      if (commandBarRef.current || document.getElementById('terminal-commands')) return;
      
      const content = document.querySelector('.hero .hero-content');
      if (!content) return;

      const bar = document.createElement('div');
      bar.id = 'terminal-commands';
      bar.style.display = 'flex';
      bar.style.gap = '8px';
      bar.style.marginTop = '18px';
      bar.style.flexWrap = 'wrap';

      const quick = ['help', 'profile', 'projects', 'services', 'contact', 'ping edge.cdn', 'deploy demo-app', 'whoami', 'clear'];
      quick.forEach(q => {
        const btn = document.createElement('button');
        btn.className = 'cmd-chip';
        btn.type = 'button';
        btn.textContent = q;
        btn.style.padding = '8px 10px';
        btn.style.borderRadius = '10px';
        btn.style.background = 'rgba(255,255,255,0.03)';
        btn.style.color = 'var(--muted)';
        btn.style.border = '1px solid rgba(255,255,255,0.04)';
        btn.style.fontFamily = 'var(--mono)';
        btn.style.fontSize = '13px';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all 0.2s ease';
        btn.addEventListener('mouseenter', () => {
          btn.style.background = 'rgba(255,255,255,0.06)';
          btn.style.color = 'var(--gold)';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.background = 'rgba(255,255,255,0.03)';
          btn.style.color = 'var(--muted)';
        });
        btn.addEventListener('click', () => execCommandLine(q));
        bar.appendChild(btn);
      });

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Type a command (press Enter)';
      input.style.minWidth = '220px';
      input.style.padding = '8px 10px';
      input.style.borderRadius = '10px';
      input.style.border = '1px solid rgba(255,255,255,0.06)';
      input.style.background = 'rgba(0,0,0,0.06)';
      input.style.color = 'var(--text)';
      input.style.fontFamily = 'var(--mono)';
      input.style.fontSize = '13px';

      const history: string[] = [];
      let historyIndex = -1;
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const v = input.value.trim();
          if (v) {
            execCommandLine(v);
            history.unshift(v);
            historyIndex = -1;
            input.value = '';
          }
        } else if (e.key === 'ArrowUp') {
          if (history.length && historyIndex < history.length - 1) {
            historyIndex++;
            input.value = history[historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          if (historyIndex > 0) {
            historyIndex--;
            input.value = history[historyIndex];
          } else {
            historyIndex = -1;
            input.value = '';
          }
        }
      });

      bar.appendChild(input);
      content.appendChild(bar);
      commandBarRef.current = bar;
    };

    // Initialize
    term.clear();
    await writeTypedLocal('\x1b[1;92m>>> MAXON REID INTERACTIVE TERMINAL <<<\x1b[0m\r\n', 10);
    term.writeln('');
    await writeTypedLocal('\x1b[93m[!]\x1b[0m Type \x1b[92m"help"\x1b[0m or use command chips below\r\n', 10);
    term.writeln('');
    await handlers.profile([]);
    buildCommandBar();
  };

  return (
    <div className="device" role="img" aria-label="Terminal mockup card">
      <div className="device-screen">
        <div
          id="xterm"
          className="xterm-container"
          role="group"
          aria-label="Demo terminal"
          ref={terminalRef}
        ></div>
      </div>
      <div className="device-base" aria-hidden="true"></div>
    </div>
  );
}
