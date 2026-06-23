// author: tilaven
// version: 0.0.3

(function () {
    'use strict';

    // pick game language from game_data.locale (Polish on pl_*, English otherwise)
    var I18n = {
        strings: {
            pl: {
                title: 'Asystent zbieractwa',
                unit: 'Jednostka',
                send: 'Wysyłaj',
                reserve: 'Rezerwa',
                order: 'Kolejność',
                orderLowFirst: 'Od najniższego',
                orderHighFirst: 'Od najwyższego',
                redirecting: 'Skrypt działa tylko na ekranie zbieractwa, przekierowuję.',
                filled: 'Wypełniono poziom {level} ({name}). Kliknij Start i odpal ponownie dla kolejnych.'
            },
            en: {
                title: 'Scavenge Assistant',
                unit: 'Unit',
                send: 'Send',
                reserve: 'Reserve',
                order: 'Order',
                orderLowFirst: 'Lowest first',
                orderHighFirst: 'Highest first',
                redirecting: 'Script works only in Scavenging page, redirecting.',
                filled: 'Filled level {level} ({name}). Click Start, then run again for the next ones.'
            },
            ar: {
                title: 'مساعد النهب',
                unit: 'الوحدة',
                send: 'إرسال',
                reserve: 'احتياطي',
                redirecting: 'هذا السكربت يعمل فقط في صفحة النهب، جارٍ إعادة التوجيه.',
                filled: 'تم ملء المستوى {level} ({name}). اضغط ابدأ، ثم شغّل السكربت مرة أخرى للمستويات التالية.'
            },
            cs: {
                title: 'Asistent sběru surovin',
                unit: 'Jednotka',
                send: 'Odeslat',
                reserve: 'Rezerva',
                redirecting: 'Skript funguje pouze na stránce sběru surovin, přesměrovávám.',
                filled: 'Vyplněna úroveň {level} ({name}). Klikni na Start, poté spusť skript znovu pro další.'
            },
            nl: {
                title: 'Rooftochten-assistent',
                unit: 'Eenheid',
                send: 'Versturen',
                reserve: 'Reserve',
                redirecting: 'Script werkt alleen op de rooftochten-pagina, doorverwijzen.',
                filled: 'Niveau {level} ({name}) ingevuld. Klik op Start en voer opnieuw uit voor de volgende.'
            },
            fr: {
                title: 'Assistant de collecte',
                unit: 'Unité',
                send: 'Envoyer',
                reserve: 'Réserve',
                redirecting: 'Le script fonctionne uniquement sur la page de collecte, redirection.',
                filled: 'Niveau {level} ({name}) rempli. Cliquez sur Démarrer, puis relancez pour les suivants.'
            },
            de: {
                title: 'Raubzug-Assistent',
                unit: 'Einheit',
                send: 'Senden',
                reserve: 'Reserve',
                redirecting: 'Skript funktioniert nur auf der Raubzug-Seite, leite weiter.',
                filled: 'Stufe {level} ({name}) ausgefüllt. Klicke auf Start und führe das Skript erneut aus für die nächsten.'
            },
            es: {
                title: 'Asistente de recolección',
                unit: 'Unidad',
                send: 'Enviar',
                reserve: 'Reserva',
                redirecting: 'El script solo funciona en la página de recolección, redirigiendo.',
                filled: 'Nivel {level} ({name}) rellenado. Haz clic en Iniciar y vuelve a ejecutar para los siguientes.'
            },
            it: {
                title: 'Assistente Rovistamento',
                unit: 'Unità',
                send: 'Invia',
                reserve: 'Riserva',
                redirecting: 'Lo script funziona solo nella pagina di rovistamento, reindirizzamento.',
                filled: 'Livello {level} ({name}) compilato. Clicca Avvia, poi riavvia lo script per i successivi.'
            },
            pt: {
                title: 'Assistente de busca minuciosa',
                unit: 'Unidade',
                send: 'Enviar',
                reserve: 'Reserva',
                redirecting: 'O script só funciona na página de busca minuciosa, a redirecionar.',
                filled: 'Nível {level} ({name}) preenchido. Clica em Iniciar e executa novamente para os próximos.'
            },
            pt_br: {
                title: 'Assistente de coleta',
                unit: 'Unidade',
                send: 'Enviar',
                reserve: 'Reserva',
                redirecting: 'O script só funciona na página de coleta, redirecionando.',
                filled: 'Nível {level} ({name}) preenchido. Clique em Iniciar e execute novamente para os próximos.'
            },
            ro: {
                title: 'Asistent curățare',
                unit: 'Unitate',
                send: 'Trimite',
                reserve: 'Rezervă',
                redirecting: 'Scriptul funcționează doar pe pagina de curățare, redirecționare.',
                filled: 'Nivelul {level} ({name}) completat. Apasă Start, apoi rulează din nou pentru următoarele.'
            },
            sk: {
                title: 'Asistent zberu surovín',
                unit: 'Jednotka',
                send: 'Odoslať',
                reserve: 'Rezerva',
                redirecting: 'Skript funguje iba na stránke zberu surovín, presmerovanie.',
                filled: 'Úroveň {level} ({name}) vyplnená. Klikni na Štart, potom spusti znova pre ďalšie.'
            },
            hu: {
                title: 'Gyűjtögetés asszisztens',
                unit: 'Egység',
                send: 'Küldés',
                reserve: 'Tartalék',
                redirecting: 'A szkript csak a gyűjtögetés oldalon működik, átirányítás.',
                filled: '{level} ({name}) szint kitöltve. Kattints a Start gombra, majd futtasd újra a többihez.'
            },
            el: {
                title: 'Βοηθός Σάρωσης',
                unit: 'Μονάδα',
                send: 'Αποστολή',
                reserve: 'Εφεδρεία',
                redirecting: 'Το script λειτουργεί μόνο στη σελίδα σάρωσης, ανακατεύθυνση.',
                filled: 'Συμπληρώθηκε το επίπεδο {level} ({name}). Πάτησε Έναρξη και τρέξε ξανά για τα επόμενα.'
            },
            tr: {
                title: 'Temizlik asistanı',
                unit: 'Birim',
                send: 'Gönder',
                reserve: 'Yedek',
                redirecting: 'Komut dosyası yalnızca temizlik sayfasında çalışır, yönlendiriliyor.',
                filled: '{level} ({name}) seviyesi dolduruldu. Başlat\'a tıkla, sonra sonrakiler için tekrar çalıştır.'
            },
            ru: {
                title: 'Помощник сбора ресурсов',
                unit: 'Юнит',
                send: 'Отправить',
                reserve: 'Резерв',
                redirecting: 'Скрипт работает только на странице сбора ресурсов, перенаправление.',
                filled: 'Уровень {level} ({name}) заполнен. Нажми Старт, затем запусти снова для следующих.'
            },
            uk: {
                title: 'Помічник збору ресурсів',
                unit: 'Юніт',
                send: 'Відправити',
                reserve: 'Резерв',
                redirecting: 'Скрипт працює лише на сторінці збору ресурсів, перенаправлення.',
                filled: 'Рівень {level} ({name}) заповнено. Натисни Старт, потім запусти знову для наступних.'
            }
        },

        // language from game_data.locale: try full locale first (e.g. "pt_br" to
        // tell Brazilian from European Portuguese), then 2-letter, then English.
        lang: function () {
            var locale = ((window.game_data && window.game_data.locale) || '').toLowerCase().replace('-', '_');
            if (this.strings[locale]) {
                return locale;
            }
            var code = locale.slice(0, 2);
            return this.strings[code] ? code : 'en';
        },

        t: function (key, vars) {
            var str = this.strings[this.lang()][key] || this.strings.en[key] || key;
            if (vars) {
                Object.keys(vars).forEach(function (k) {
                    str = str.replace('{' + k + '}', vars[k]);
                });
            }
            return str;
        }
    };

    var RequiredScreen = {
        isOnScreen: function () {
            var p = new URLSearchParams(window.location.search);
            return p.get('screen') === 'place' && p.get('mode') === 'scavenge';
        },

        generateScavengingUrl: function () {
            return window.TribalWars.buildURL('GET', 'place', {
                mode: 'scavenge',
            })
        },

        redirect: function () {
            if (this.isOnScreen()) {
                return;
            }

            window.UI.InfoMessage(I18n.t('redirecting'));
            var url = this.generateScavengingUrl();
            setTimeout(function () {
                window.location.href = url;
            }, 500);
        }
    };

    var AvailableLevels = {
        // free = unlocked and no squad out. Returns [{level, name, lootFactor}] sorted by level.
        get: function () {
            var options = Scavenge.options();
            var available = [];
            Object.keys(options).forEach(function (key) {
                var opt = options[key];
                if (!opt.is_locked && !opt.scavenging_squad) {
                    available.push({level: opt.base.id, name: opt.base.name, lootFactor: opt.base.loot_factor});
                }
            });
            available.sort(function (a, b) {
                return a.level - b.level;
            });
            if (Settings.order() === 'desc') {
                available.reverse();               // fill highest level first
            }
            return available;
        }
    };

    var Units = {
        // archer world? on worlds without archers the entry is absent or empty
        hasArchers: function () {
            var el = document.querySelector('.units-entry-all[data-unit="archer"]');
            return !!el && el.textContent.trim() !== '';
        },

        // unit types to consider (no archers/mounted archers on worlds without them)
        names: function () {
            var all = ['spear', 'sword', 'axe', 'archer', 'light', 'marcher', 'heavy'];
            if (this.hasArchers()) {
                return all;
            }
            return all.filter(function (u) {
                return u !== 'archer' && u !== 'marcher';
            });
        },

        // visible input for a unit — mobile DOM may hold a hidden duplicate widget,
        // so pick the one actually rendered (offsetParent is null when hidden)
        input: function (unit) {
            var inputs = document.querySelectorAll('input[name="' + unit + '"]');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].offsetParent !== null) {
                    return inputs[i];
                }
            }
            return inputs[0] || null;
        },

        // how many of this unit are in the village (from the "(N)" text next to the input)
        available: function (unit) {
            var input = this.input(unit);
            if (!input) {
                return 0;
            }
            var link = input.parentNode.querySelector('.units-entry-all');
            if (!link) {
                return 0;
            }
            var match = link.textContent.match(/\d+/);
            return match ? Number(match[0]) : 0;
        },

        // writes the number into the field and notifies the game framework (mobile-safe)
        fill: function (unit, number) {
            var input = this.input(unit);
            if (!input) {
                return;
            }
            input.value = number;
            input.dispatchEvent(new Event('input', {bubbles: true}));
            input.dispatchEvent(new Event('change', {bubbles: true}));
        }
    };

    // user settings saved in localStorage: per-unit reserve (default 0) and
    // whether to send each unit type at all (default true).
    var Settings = {
        KEY: 'mazSettings',
        data: null,

        load: function () {
            if (this.data === null) {
                var stored = {};
                try {
                    stored = JSON.parse(localStorage.getItem(this.KEY)) || {};
                } catch (e) {
                }
                var sr = stored.reserve || {};
                var se = stored.enabled || {};
                var d = {
                    reserve: {}, enabled: {},
                    collapsed: !!stored.collapsed,                       // default expanded
                    order: stored.order === 'desc' ? 'desc' : 'asc'      // default lowest first
                };
                Units.names().forEach(function (u) {
                    d.reserve[u] = u in sr ? (Number(sr[u]) || 0) : 0;     // default 0
                    d.enabled[u] = u in se ? !!se[u] : true;               // default on
                });
                this.data = d;
            }
            return this.data;
        },

        save: function () {
            try {
                localStorage.setItem(this.KEY, JSON.stringify(this.data));
            } catch (e) {
            }
        },

        reserve: function (unit) {
            return this.load().reserve[unit] || 0;
        },
        enabled: function (unit) {
            return this.load().enabled[unit] !== false;
        },

        setReserve: function (unit, value) {
            this.load().reserve[unit] = Math.max(0, Number(value) || 0);
            this.save();
        },
        setEnabled: function (unit, value) {
            this.load().enabled[unit] = !!value;
            this.save();
        },

        collapsed: function () {
            return !!this.load().collapsed;
        },
        setCollapsed: function (value) {
            this.load().collapsed = !!value;
            this.save();
        },

        order: function () {
            return this.load().order;
        },
        setOrder: function (value) {
            this.load().order = value === 'desc' ? 'desc' : 'asc';
            this.save();
        }
    };

    var Scavenge = {
        // raw scavenging options object from the game, keyed "1".."4" ({} if missing)
        options: function () {
            var s = window.ScavengeScreen;
            return (s && s.village && s.village.options) || {};
        }
    };

    var Planner = {
        // levels: [{level, name}]
        // returns [{ level, name, units: {unit: count} }]
        //
        // We fill one level per run and re-run for the rest. Splitting the troops
        // currently at home across the currently free levels by weight reproduces the
        // ideal even split with no leftover (e.g. 3/8 split 2:1 = exactly 2/8 and 1/8).
        plan: function (levels) {
            var names = Units.names();

            // weights = 1/factor → capacity ∝ weight gives equal finish time (15:6:3:2)
            var sumW = 0;
            var weight = {};
            levels.forEach(function (lvl) {
                var w = 1 / lvl.lootFactor;
                weight[lvl.level] = w;
                sumW += w;
            });

            // sendable per unit = (in village − reserve), 0 if the unit is disabled
            var avail = {};
            names.forEach(function (u) {
                if (!Settings.enabled(u)) {
                    avail[u] = 0;
                    return;
                }
                avail[u] = Math.max(0, Units.available(u) - Settings.reserve(u));
            });

            // same fraction of each unit to each level → capacity in proportion to weights
            return levels.map(function (lvl) {
                var frac = weight[lvl.level] / sumW;
                var unitsToSend = {};
                names.forEach(function (u) {
                    unitsToSend[u] = Math.floor(avail[u] * frac);
                });
                return {level: lvl.level, name: lvl.name, units: unitsToSend};
            });
        }
    };

    var Dispatcher = {
        // the form is shared across levels, so we fill only the FIRST free one.
        // the user clicks Start manually and re-runs the script for the next ones.
        fillFirst: function (plan) {
            var entry = plan[0];
            Units.names().forEach(function (u) {
                Units.fill(u, entry.units[u] || 0);
            });
            return entry;
        }
    };

    // settings panel injected into the scavenge screen (styled like the game UI)
    var SettingsUI = {
        render: function () {
            if (document.getElementById('maz-settings')) {
                return;                                    // already rendered this load
            }
            var container = document.getElementById('scavenge_screen');
            if (!container) {
                return;
            }

            // reuse the game's own unit icons so the table matches the UI
            function icon(unit) {
                var link = document.querySelector('.unit_link[data-unit="' + unit + '"]');
                return link ? link.innerHTML : unit;
            }

            function enableCell(u) {
                return '<input type="checkbox" data-maz-enable="' + u + '"' + (Settings.enabled(u) ? ' checked' : '') + '>';
            }

            function reserveCell(u) {
                return '<input type="text" size="4" data-maz-reserve="' + u + '" value="' + Settings.reserve(u) + '">';
            }

            function cells(builder) {
                return Units.names().map(function (u) {
                    return '<td style="text-align:center">' + builder(u) + '</td>';
                }).join('');
            }

            var table;
            // wide screen → units as columns (horizontal); narrow → units as rows (vertical)
            if (window.matchMedia('(min-width: 600px)').matches) {
                var heads = Units.names().map(function (u) {
                    return '<th style="text-align:center">' + icon(u) + '</th>';
                }).join('');
                table = '<table class="vis"><tbody>'
                    + '<tr><th></th>' + heads + '</tr>'
                    + '<tr><th>' + I18n.t('send') + '</th>' + cells(enableCell) + '</tr>'
                    + '<tr><th>' + I18n.t('reserve') + '</th>' + cells(reserveCell) + '</tr>'
                    + '</tbody></table>';
            } else {
                var rows = Units.names().map(function (u) {
                    return '<tr>'
                        + '<td style="text-align:center">' + icon(u) + '</td>'
                        + '<td style="text-align:center">' + enableCell(u) + '</td>'
                        + '<td style="text-align:center">' + reserveCell(u) + '</td>'
                        + '</tr>';
                }).join('');
                table = '<table class="vis">'
                    + '<thead><tr><th>' + I18n.t('unit') + '</th><th>' + I18n.t('send') + '</th><th>' + I18n.t('reserve') + '</th></tr></thead>'
                    + '<tbody>' + rows + '</tbody></table>';
            }

            // one cohesive box: header bar + table share a single gold frame.
            // ::marker hidden; own ▸ arrow rotates to ▾ via the [open] state.
            if (!document.getElementById('maz-style')) {
                var style = document.createElement('style');
                style.id = 'maz-style';
                style.textContent =
                    '#maz-settings details{margin:8px 0;border:1px solid #c1a264;border-radius:4px;'
                    + 'background:#f4e4bc;overflow:hidden;display:inline-block;min-width:240px}'
                    + '#maz-settings summary{cursor:pointer;padding:6px 10px;font-size:14px;font-weight:bold;'
                    + 'color:#5d4108;list-style:none;user-select:none}'
                    + '#maz-settings summary::-webkit-details-marker{display:none}'
                    + '#maz-settings summary::before{content:"\\25B8";display:inline-block;margin-right:6px;'
                    + 'transition:transform .15s}'
                    + '#maz-settings details[open] summary::before{transform:rotate(90deg)}'
                    + '#maz-settings details[open] summary{border-bottom:1px solid #c1a264}'
                    + '#maz-settings table{margin:8px}'
                    + '#maz-settings .maz-order{margin:0 8px 8px;font-size:13px;color:#5d4108}'
                    // TW confirm-green fill (like .current-quest) + pulsing glow on the Start button to click
                    + '@keyframes maz-pulse{0%,100%{box-shadow:0 0 4px 1px #0e7a1e}50%{box-shadow:0 0 12px 4px #13c600}}'
                    + '.free_send_button.maz-highlight{animation:maz-pulse 1s infinite;color:#fff!important;'
                    + 'border-color:#006712!important;'
                    + 'background:#0bac00!important;'
                    + 'background:linear-gradient(to bottom,#0bac00 0%,#0e7a1e 100%)!important}';
                document.head.appendChild(style);
            }

            var orderRow = '<div class="maz-order">' + I18n.t('order') + ': '
                + '<select data-maz-order>'
                + '<option value="asc"' + (Settings.order() === 'asc' ? ' selected' : '') + '>' + I18n.t('orderLowFirst') + ' (1 → 4)</option>'
                + '<option value="desc"' + (Settings.order() === 'desc' ? ' selected' : '') + '>' + I18n.t('orderHighFirst') + ' (4 → 1)</option>'
                + '</select></div>';

            var div = document.createElement('div');
            div.id = 'maz-settings';
            div.innerHTML = '<details' + (Settings.collapsed() ? '' : ' open') + '>'
                + '<summary>' + I18n.t('title') + '</summary>'
                + table + orderRow + '</details>';

            // place right after the game's explanatory text, not at the top of the screen
            var anchor = container.querySelector('.explanatory-text');
            if (anchor) {
                anchor.insertAdjacentElement('afterend', div);
            } else {
                container.prepend(div);
            }

            var details = div.querySelector('details');
            details.addEventListener('toggle', function () {
                Settings.setCollapsed(!details.open);   // remember open/closed across loads
            });

            div.querySelectorAll('[data-maz-enable]').forEach(function (cb) {
                cb.addEventListener('change', function () {
                    Settings.setEnabled(cb.getAttribute('data-maz-enable'), cb.checked);
                    App.run();                               // re-split with the new setting
                });
            });
            div.querySelectorAll('[data-maz-reserve]').forEach(function (inp) {
                inp.addEventListener('change', function () {
                    Settings.setReserve(inp.getAttribute('data-maz-reserve'), inp.value);
                    App.run();                               // re-split with the new setting
                });
            });
            div.querySelector('[data-maz-order]').addEventListener('change', function () {
                Settings.setOrder(this.value);
                App.run();                                   // refill starting from the chosen end
            });
        }
    };

    var App = {
        // recompute the split and fill the first free level's form.
        // scroll=true (only on script launch) scrolls the filled level into view,
        // handy on mobile; settings tweaks re-run without scrolling.
        run: function (scroll) {
            var levels = AvailableLevels.get();
            if (levels.length < 1) {
                return;                                    // nothing free to fill
            }
            var plan = Planner.plan(levels);
            var filled = Dispatcher.fillFirst(plan);
            window.UI.InfoMessage(I18n.t('filled', {level: filled.level, name: filled.name}));

            // level N is the Nth .scavenge-option in document order
            var option = document.querySelectorAll('.scavenge-option')[filled.level - 1];

            // move the green pulse onto the Start button we just filled for
            document.querySelectorAll('.free_send_button.maz-highlight').forEach(function (b) {
                b.classList.remove('maz-highlight');
            });
            if (option) {
                var startBtn = option.querySelector('.free_send_button');
                if (startBtn) {
                    startBtn.classList.add('maz-highlight');
                }
                if (scroll) {
                    option.scrollIntoView({behavior: 'smooth', block: 'center'});
                }
            }
        },

        start: function () {
            RequiredScreen.redirect();

            if (!RequiredScreen.isOnScreen()) {
                return;
            }

            SettingsUI.render();
            this.run(true);
        }
    };

    App.start();
})();
