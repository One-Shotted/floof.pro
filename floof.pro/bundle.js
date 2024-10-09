( () => {
    "use strict";
    var e, t, a, i, o = {
        700: (e, t, a) => {
            a.a(e, (async (e, t) => {
                try {
                    var i = a(338)
                      , o = a(703)
                      , n = a(874)
                      , s = a(110)
                      , r = a(917)
                      , l = a(938)
                      , c = a(768)
                      , h = e([o, r, l]);
                    function d() {
                        const e = document.getElementById("lobbiesDisplay");
                        e.innerHTML = "<span>Loading...</span>",
                        o.Aw().then((t => {
                            e.innerHTML = "",
                            t.forEach((t => {
                                const a = document.createElement("div");
                                a.textContent = t.name + " (" + s.hg[t.biome].name + " " + t.gamemode + ")",
                                t.isModded && (a.textContent += " (modded)"),
                                t.trusted && (a.style.color = n.Tj.playerYellow,
                                a.textContent += " (trusted)"),
                                a.onclick = () => {
                                    g().then((e => {
                                        o.X0(t.partyCode, e, t.directConnect ? location.protocol.replace("http", "ws") + "//" + t.directConnect.address : n.UB.replace("http", "ws"))
                                    }
                                    ))
                                }
                                ,
                                e.appendChild(a)
                            }
                            ))
                        }
                        ))
                    }
                    function u(e) {
                        document.querySelectorAll(".preMenu").forEach((t => {
                            t.classList.remove("active"),
                            t.id === e && (t.classList.add("active"),
                            "findLobbies" === e && d())
                        }
                        ))
                    }
                    async function g() {
                        return u("usernameInput"),
                        new Promise((e => {
                            const t = document.getElementById("usernameInputInput")
                              , a = document.getElementById("usernameButton");
                            a.onclick = () => {
                                const i = t.value.trim() || "guest";
                                i.length > 24 ? (0,
                                n.Ho)(t) : (a.onclick = null,
                                u("thisshouldntexistsoletshopeitdoesnt"),
                                e(i))
                            }
                        }
                        ))
                    }
                    [o,r,l] = h.then ? (await h)() : h,
                    location.hash && fetch(n.UB + "/lobby/get?partyURL=" + location.hash.slice(1)).then((e => e.json())).then((e => {
                        null == e ? (console.warn("Invalid party URL"),
                        location.hash = "",
                        history.replaceState(null, null, location.pathname + location.search)) : g().then((async e => {
                            const t = await fetch(n.UB + "/lobby/get?partyURL=" + location.hash.slice(1))
                              , a = await t.text();
                            if ("null" == a)
                                return alert("Invalid party URL"),
                                location.hash = "",
                                void history.replaceState(null, null, location.pathname + location.search);
                            const i = JSON.parse(a);
                            o.X0(location.hash.slice(1), e, i.directConnect ? location.protocol.replace("http", "ws") + "//" + i.directConnect.address : n.UB.replace("http", "ws"))
                        }
                        ))
                    }
                    )).catch(( () => {
                        console.warn("Invalid party URL"),
                        location.hash = "",
                        history.replaceState(null, null, location.pathname + location.search)
                    }
                    )),
                    document.getElementById("lobbyName").value = "Lobby " + Math.floor(1e3 * Math.random()),
                    document.getElementById("refreshLobbies").onclick = d,
                    document.querySelectorAll("button").forEach((e => {
                        e.dataset.switchmenu && (e.onclick = () => u(e.dataset.switchmenu))
                    }
                    ));
                    let f = !1;
                    document.getElementById("createLobbyButton").onclick = async () => {
                        if (f)
                            return;
                        const e = document.getElementById("lobbyName");
                        if (e.value.length < 3 || e.value.length > 16 || !/^[a-zA-Z0-9 ]+$/.test(e.value))
                            return void (0,
                            n.Ho)(e);
                        const t = document.getElementById("gamemodeSelect");
                        localStorage.setItem("gamemode", t.value);
                        const a = document.getElementById("biomeSelect");
                        localStorage.setItem("biome", a.value);
                        const i = document.getElementById("enableMods");
                        localStorage.setItem("enableMods", i.checked);
                        const s = document.getElementById("privateLobby");
                        localStorage.setItem("privateLobby", s.checked),
                        f = !0,
                        document.getElementById("createLobbyButton").disabled = !0;
                        const r = await o.sA(e.value, t.value, i.checked, s.checked, a.value);
                        if (document.getElementById("createLobbyButton").disabled = !1,
                        !r.ok)
                            return alert(r.error),
                            void (f = !1);
                        const l = await g();
                        localStorage.setItem("username", l),
                        o.X0(r.party, l)
                    }
                    ;
                    let m = 0
                      , T = 0
                      , b = 0;
                    function k() {
                        let e = 0;
                        (o.Kd.has("w") || o.Kd.has("arrowup")) && (e |= 1),
                        (o.Kd.has("a") || o.Kd.has("arrowleft")) && (e |= 2),
                        (o.Kd.has("s") || o.Kd.has("arrowdown")) && (e |= 4),
                        (o.Kd.has("d") || o.Kd.has("arrowright")) && (e |= 8),
                        (o.Kd.has(" ") || o.P5.left) && (e |= 16),
                        (o.Kd.has("shift") || o.P5.right) && (e |= 32),
                        e === m && T === o.P5.x && b === o.P5.y || (n.fF.mouseMovement && (e |= 64,
                        T = o.P5.x,
                        b = o.P5.y),
                        o.wk.socket?.talk(s.fh.INPUTS, e),
                        m = e)
                    }
                    function p() {
                        const e = {
                            type: l.VE.type,
                            index: l.VE.index
                        };
                        let t = null;
                        const a = o.P5.x / (0,
                        i.dX)()
                          , n = o.P5.y / (0,
                        i.dX)();
                        for (let e = 0; e < o.wk.slots.length; e++) {
                            const i = o.wk.slots[e];
                            if (i.icon && i.icon.x < a && i.icon.x + i.icon.size > a && i.icon.y < n && i.icon.y + i.icon.size > n) {
                                t = {
                                    type: l.Ux,
                                    index: e
                                };
                                break
                            }
                        }
                        if (null === t)
                            for (let e = 0; e < o.wk.secondarySlots.length; e++) {
                                const i = o.wk.secondarySlots[e];
                                if (i.icon && i.icon.x < a && i.icon.x + i.icon.size > a && i.icon.y < n && i.icon.y + i.icon.size > n) {
                                    t = {
                                        type: l.Xn,
                                        index: e
                                    };
                                    break
                                }
                            }
                        if (null === t) {
                            const e = o.wk.destroyIcon;
                            e.realX < a && e.realX + e.realSize > a && e.realY < n && e.realY + e.realSize > n && (t = {
                                type: l.tq,
                                index: 0
                            })
                        }
                        return null !== t && (t.type !== e.type || t.index !== e.index) && ((e.type !== l.Ux || t.type !== l.Xn || -1 !== o.wk.secondarySlots[t.index].index) && ((e.type !== l.Ux || t.type !== l.tq) && (o.wk.socket.talk(s.fh.CHANGE_LOADOUT, {
                            drag: e,
                            drop: t
                        }),
                        !0)))
                    }
                    window.addEventListener("keydown", (e => {
                        if ("Escape" === e.key && (o.cM.showInput = !o.cM.showInput,
                        setTimeout(( () => {
                            o.cM.showInput && o.cM.element.focus()
                        }
                        ), 250)),
                        o.cM.showInput && o.cM.element === document.activeElement)
                            "Enter" === e.key && o.cM.send();
                        else {
                            if (13 === e.keyCode && o.wk.isDead && o.wk.socket?.readyState === WebSocket.OPEN)
                                return o.wk.socket.spawn(),
                                void (o.wk.isDead = !1);
                            switch (e.key.toLowerCase()) {
                            case ";":
                                o.wk.socket.talk(s.fh.DEV_CHEAT, s.F6.GODMODE);
                                break;
                            case "t":
                                o.wk.socket.talk(s.fh.DEV_CHEAT, s.F6.TELEPORT);
                                break;
                            case "z":
                                o.wk.socket.talk(s.fh.DEV_CHEAT, s.F6.CHANGE_TEAM);
                                break;
                            case "x":
                                if (o.wk.socket?.readyState === WebSocket.OPEN)
                                    for (let e = 0; e < o.wk.slots.length; e++)
                                        o.wk.slots[e].index > -1 && o.wk.secondarySlots[e]?.index > -1 && o.wk.socket.talk(s.fh.CHANGE_LOADOUT, {
                                            drag: {
                                                type: o.wk.isInDestroy ? l.Xn : l.Ux,
                                                index: e
                                            },
                                            drop: {
                                                type: o.wk.isInDestroy ? l.tq : l.Xn,
                                                index: e
                                            }
                                        });
                                break;
                            case "k":
                                o.wk.isInDestroy = !0
                            }
                            if (e.key >= "0" && e.key <= "9") {
                                const t = "0" === e.key ? 9 : parseInt(e.key) - 1;
                                o.wk.socket?.readyState === WebSocket.OPEN && t < o.wk.slots.length && o.wk.slots[t].index > -1 && o.wk.secondarySlots[t]?.index > -1 && o.wk.socket.talk(s.fh.CHANGE_LOADOUT, {
                                    drag: {
                                        type: o.wk.isInDestroy ? l.Xn : l.Ux,
                                        index: t
                                    },
                                    drop: {
                                        type: o.wk.isInDestroy ? l.tq : l.Xn,
                                        index: t
                                    }
                                })
                            }
                            o.Kd.add(e.key.toLowerCase()),
                            o.wk.socket?.readyState === WebSocket.OPEN && k()
                        }
                    }
                    )),
                    window.addEventListener("keyup", (e => {
                        o.Kd.delete(e.key.toLowerCase()),
                        "k" === e.key && (o.wk.isInDestroy = !1),
                        o.wk.socket?.readyState === WebSocket.OPEN && k()
                    }
                    )),
                    window.addEventListener("mousemove", (e => {
                        o.P5.x = e.clientX * window.devicePixelRatio,
                        o.P5.y = e.clientY * window.devicePixelRatio,
                        n.fF.mouseMovement && k()
                    }
                    )),
                    window.addEventListener("mousedown", (e => {
                        switch (e.button) {
                        case 0:
                            o.P5.left = !0;
                            break;
                        case 2:
                            o.P5.right = !0
                        }
                        o.wk.socket?.readyState === WebSocket.OPEN && k()
                    }
                    )),
                    window.addEventListener("mouseup", (e => {
                        switch (e.button) {
                        case 0:
                            o.P5.left = !1;
                            break;
                        case 2:
                            o.P5.right = !1
                        }
                        o.wk.socket?.readyState === WebSocket.OPEN && k()
                    }
                    ));
                    const F = {
                        fps: 0,
                        mspt: 0,
                        frames: 0,
                        totalTime: 0
                    };
                    setInterval(( () => {
                        F.fps = F.frames,
                        F.mspt = F.totalTime / Math.max(1, F.frames),
                        F.frames = 0,
                        F.totalTime = 0,
                        o.wk.updateRate = o.wk.updatesCounter,
                        o.wk.updatesCounter = 0
                    }
                    ), 1e3);
                    let w = {
                        nameText: 200,
                        chatBGSize: 0
                    };
                    function y() {
                        o.wk.interpolationFactor = n.fF.rigidInterpolation ? .4 : .2,
                        requestAnimationFrame(y);
                        const e = performance.now();
                        o.wk.socket?.readyState !== WebSocket.OPEN && (o.wk.camera.realX += .5,
                        o.wk.camera.realY = 50 * Math.sin(o.wk.camera.realX / 100)),
                        o.wk.camera.interpolate();
                        const t = (0,
                        i.De)(o.wk.camera.fov)
                          , a = o.wk.camera.x * t
                          , c = o.wk.camera.y * t
                          , h = .5 * i.Ji.width
                          , d = .5 * i.Ji.height;
                        if ((0,
                        i.jM)(a, c, t, o.wk.socket?.readyState === WebSocket.OPEN, o.wk.room.width, o.wk.room.height, o.wk.disconnected ? null : s.hg[o.wk.room.biome], o.wk.room.isRadial),
                        o.wk.disconnected) {
                            const e = (0,
                            i.dX)();
                            i.ej.save(),
                            i.ej.scale(e, e);
                            const t = i.Ji.width / e
                              , a = i.Ji.height / e;
                            return (0,
                            i.Qq)("Disconnected", t / 2, a / 2, 30),
                            (0,
                            i.Qq)(o.wk.disconnectMessage, t / 2, a / 2 + 30, 15),
                            void i.ej.restore()
                        }
                        null !== o.wk.terrain && o.wk.terrainImg && i.ej.drawImage(o.wk.terrainImg, -o.wk.room.width / 2 * t - a + h, -o.wk.room.height / 2 * t - c + d, o.wk.room.width * t, o.wk.room.height * t),
                        o.wk.markers.forEach((e => {
                            const n = e.x * t - a + h
                              , s = e.y * t - c + d;
                            e.tick > 1 ? o.wk.markers.delete(e.id) : (i.ej.save(),
                            i.ej.translate(n, s),
                            i.ej.scale(e.size * t, e.size * t),
                            (0,
                            r.Ge)(i.ej, e.tick),
                            i.ej.restore())
                        }
                        )),
                        o.wk.drops.forEach((e => {
                            let o = e.x * t - a + h
                              , n = e.y * t - c + d;
                            i.ej.save(),
                            i.ej.translate(o, n),
                            i.ej.scale(e.size * t, e.size * t),
                            i.ej.rotate(.5 * Math.sin(performance.now() / 1500 + e.id * Math.PI / 6)),
                            i.ej.drawImage((0,
                            r.GM)(e.index, e.rarity), -.5, -.5, 1, 1),
                            i.ej.restore()
                        }
                        )),
                        o.wk.mobs.forEach((e => {
                            e.interpolate();
                            let l = e.x * t - a + h
                              , u = e.y * t - c + d;
                            const g = e.size * t;
                            if (n.fF.showHitboxes && (i.ej.beginPath(),
                            i.ej.arc(l, u, g, 0, 2 * Math.PI),
                            i.ej.lineWidth = 1.5 * t,
                            i.ej.strokeStyle = n.Tj["???"],
                            i.ej.stroke()),
                            i.ej.save(),
                            i.ej.translate(l, u),
                            i.ej.scale(g, g),
                            i.ej.rotate(e.facing),
                            n.fF.fancyGraphics && o.wk.room.biome === s.VC.HELL && (i.ej.shadowBlur = 10 * t * (.8 * Math.sin(performance.now() / 500 + 3 * e.id) + .8),
                            i.ej.shadowColor = "#FFFFFF"),
                            (0,
                            r.tl)(e.id, e.index, e.rarity, e.hit, i.ej, e.attack, e.friendly, e.facing, e.extraData),
                            i.ej.restore(),
                            !n.fF.hideEntityUI && !o.wk.mobConfigs[e.index].hideUI) {
                                const a = Math.max(g, 30 * t)
                                  , s = (6 + e.rarity) * t;
                                (0,
                                i.iA)(l - a, l + a, u + a + 13 * t, s, n.Tj["???"]),
                                (0,
                                i.iA)(l - a, l - a + 2 * a * e.secondaryHealthBar, u + a + 13 * t, .667 * s, n.Tj.legendary),
                                (0,
                                i.iA)(l - a, l - a + 2 * a * e.healthRatio, u + a + 13 * t, .667 * s, e.poisoned ? (0,
                                i.Lh)(n.Tj.common, n.Tj.irisPurple, .5 + .5 * Math.sin(performance.now() / 333 + 3 * e.id)) : n.Tj.common),
                                i.ej.textAlign = "left",
                                (0,
                                i.Qq)(o.wk.mobConfigs[e.index].name, l - a - .5 * s, u + a + 9 * t - .5 * s, 8 * t),
                                i.ej.textAlign = "right",
                                (0,
                                i.Qq)(o.wk.tiers[e.rarity].name, l + a + .5 * s, u + a + 19 * t + .5 * s, 8 * t, o.wk.tiers[e.rarity].color)
                            }
                        }
                        )),
                        i.ej.textAlign = "center",
                        o.wk.petals.forEach((e => {
                            e.interpolate();
                            let o = e.x * t - a + h
                              , n = e.y * t - c + d;
                            i.ej.save(),
                            i.ej.translate(o, n),
                            i.ej.scale(e.size * t, e.size * t),
                            i.ej.rotate(e.facing),
                            (0,
                            r.Lt)(e.index, e.hit, i.ej, e.id),
                            i.ej.restore()
                        }
                        )),
                        o.wk.players.forEach((e => {
                            e.interpolate();
                            let l = 1
                              , u = 1.7;
                            e.attack && (l = 2,
                            u = .35),
                            e.defend && (l = 3,
                            u = .9),
                            e.mood = (0,
                            n.Cc)(e.mood, l, .15),
                            e.mouthDip = (0,
                            n.Cc)(e.mouthDip, u, .15);
                            let g = e.x * t - a + h
                              , f = e.y * t - c + d;
                            e.id === o.wk.playerID && (g = h,
                            f = d),
                            (0,
                            i.eC)((0,
                            i.Lh)([n.Tj.playerYellow, n.Tj.team1, n.Tj.team2][e.team] ?? n.Tj.crafting, n.Tj.legendary, .5 * e.hit), 5 * t);
                            const m = e.size * t;
                            if (e.wearing & s.DQ.AMULET) {
                                i.ej.save(),
                                i.ej.translate(g, f);
                                const a = .334 * m * Math.sin(performance.now() / 1250 + e.id * Math.PI / 6) * t;
                                i.ej.beginPath(),
                                i.ej.arc(0, 0, m + 2.5 * t, 0, 2 * Math.PI),
                                i.ej.moveTo(-m, 0),
                                i.ej.lineTo(a, 2.5 * m),
                                i.ej.lineTo(m, 0),
                                i.ej.strokeStyle = n.Tj["???"],
                                i.ej.lineWidth = 2.5 * t,
                                i.ej.stroke(),
                                i.ej.translate(a, 2.5 * m),
                                i.ej.scale(.6 * m, .6 * m),
                                i.ej.rotate(performance.now() / 1e3 + 5 * e.id),
                                (0,
                                r.dG)(i.ej, !1),
                                i.ej.restore()
                            }
                            i.ej.beginPath(),
                            i.ej.arc(g, f, m, 0, 2 * Math.PI),
                            i.ej.stroke(),
                            i.ej.fill(),
                            i.ej.translate(g, f),
                            (0,
                            i.Ao)(.425 * m, e.facing, e.mood, e.mouthDip, l),
                            i.ej.translate(-g, -f),
                            e.wearing & s.DQ.THIRD_EYE && (i.ej.save(),
                            i.ej.translate(g, f - .6 * m),
                            i.ej.scale(.3 * m, .3 * m),
                            (0,
                            r.vT)(i.ej, !1),
                            i.ej.restore()),
                            e.wearing & s.DQ.ANTENNAE && (i.ej.save(),
                            i.ej.translate(g, f - .8 * m),
                            i.ej.scale(.9 * m, .9 * m),
                            (0,
                            r.Zq)(i.ej),
                            i.ej.restore()),
                            (0,
                            i.iA)(g - m, g + m, f + m + 16 * t, 6 * t, n.Tj["???"]),
                            (0,
                            i.iA)(g - m, g - m + 2 * m * e.secondaryHealthBar, f + m + 16 * t, 4 * t, n.Tj.legendary),
                            (0,
                            i.iA)(g - m, g - m + 2 * m * e.healthRatio, f + m + 16 * t, 4 * t, e.poisoned ? (0,
                            i.Lh)(n.Tj.common, n.Tj.irisPurple, .5 + .5 * Math.sin(performance.now() / 333 + 3 * e.id)) : n.Tj.common),
                            e.shieldRatio > 0 && (0,
                            i.iA)(g - m, g - m + 2 * m * e.shieldRatio, f + m + 16 * t, 2.5 * t, n.Tj.unique),
                            n.fF.hideEntityUI || e.id === o.wk.playerID || (i.ej.textAlign = "left",
                            (0,
                            i.Qq)(e.name, g - m, f + m + 9 * t, 8 * t, e.nameColor),
                            i.ej.textAlign = "right",
                            (0,
                            i.Qq)("Lvl " + e.level, g + m, f + m + 24 * t, 8 * t, o.wk.tiers[e.rarity].color),
                            i.ej.textAlign = "center")
                        }
                        )),
                        o.wk.lightning.forEach((e => {
                            const s = e.alpha;
                            if (s <= 0)
                                o.wk.lightning.delete(e.id);
                            else {
                                i.ej.beginPath(),
                                i.ej.moveTo(e.points[0].x * t - a + h, e.points[0].y * t - c + d);
                                for (let o = 1; o < e.points.length; o++)
                                    i.ej.lineTo(e.points[o].x * t - a + h, e.points[o].y * t - c + d);
                                i.ej.lineWidth = 2 * t,
                                i.ej.strokeStyle = n.Tj.lightningTeal,
                                i.ej.globalAlpha = s,
                                i.ej.stroke()
                            }
                        }
                        )),
                        i.ej.globalAlpha = 1,
                        n.fF.useTileBackground && o.wk.socket?.readyState === WebSocket.OPEN && (0,
                        i.DZ)(a, c, t, s.hg[o.wk.room.biome]);
                        const u = (0,
                        i.dX)();
                        i.ej.save(),
                        i.ej.scale(u, u),
                        i.ej.textAlign = "center",
                        i.ej.textBaseline = "middle";
                        const g = i.Ji.width / u
                          , f = i.Ji.height / u
                          , m = o.P5.x / u
                          , T = o.P5.y / u;
                        if (o.wk.petalHover = null,
                        o.wk.slots.length > 0) {
                            const e = o.wk.isInDestroy ? 48 : 65
                              , t = 10
                              , a = o.wk.isInDestroy ? 65 : .75 * e;
                            l.VE.enabled && (l.VE.item.realSize = e),
                            o.wk.isInDestroy && (0,
                            i.Qq)("(Press the keybind to destroy the item)", g / 2, f - e - a - 4 * t, 15);
                            for (let s = 0; s < o.wk.slots.length; s++) {
                                const c = o.wk.slots[s]
                                  , h = g / 2 - (e + t) * o.wk.slots.length / 2 + (e + t) * s + t / 2
                                  , d = f - e - a - 3 * t;
                                i.ej.fillStyle = (0,
                                i.Lh)(n.Tj.unique, "#000000", .2),
                                i.ej.fillRect(h, d, e, e),
                                i.ej.fillStyle = n.Tj.unique,
                                i.ej.fillRect(h + 4, d + 4, e - 8, e - 8),
                                -1 === c.index || l.VE.enabled && l.VE.type === l.Ux && l.VE.index === s || (void 0 === c.icon && (c.icon = new o.xz,
                                c.icon.realX = c.icon.x = h,
                                c.icon.realY = c.icon.y = d,
                                c.icon.realSize = c.icon.size = e),
                                c.icon.interpolate(),
                                c.icon.realX = h,
                                c.icon.realY = d,
                                c.icon.realSize = e,
                                c.ratio > c.realRatio ? c.ratio = c.realRatio : c.ratio = (0,
                                n.Cc)(c.ratio, c.realRatio, .1),
                                c.ratio < .995 ? (0,
                                r.lv)(c.index, c.rarity, h, d, e, c.ratio, i.ej) : (i.ej.save(),
                                i.ej.translate(c.icon.x, c.icon.y),
                                i.ej.scale(c.icon.size, c.icon.size),
                                i.ej.drawImage((0,
                                r.GM)(c.index, c.rarity), 0, 0, 1, 1),
                                i.ej.restore()),
                                m > h && m < h + e && T > d && T < d + e && (o.wk.petalHover = [c.index, c.rarity],
                                o.P5.left && !l.VE.enabled && ((0,
                                l.TB)(h + e / 2, d + e / 2, e, c.index, c.rarity),
                                l.VE.type = l.Ux,
                                l.VE.index = s,
                                l.VE.item.stableSize = e,
                                l.VE.onDrop = () => {
                                    p() || (c.icon.x = o.P5.x / u - e / 2,
                                    c.icon.y = o.P5.y / u - e / 2)
                                }
                                )))
                            }
                            if (o.wk.secondarySlots.length > 0) {
                                const s = f - a - 2 * t;
                                if (l.VE.enabled) {
                                    const e = a * o.wk.slots.length + t * (o.wk.slots.length + 1)
                                      , i = g / 2 - e / 2
                                      , n = f - a - t;
                                    l.VE.item.x > i && l.VE.item.x < i + e && l.VE.item.y > n && l.VE.item.y < n + a && (l.VE.item.realSize = a)
                                }
                                const c = g / 2 - (a + t) * o.wk.slots.length / 2 + t / 2;
                                (0,
                                i.Qq)("[x]", c - a / 2, s + a / 2, 15);
                                for (let c = 0; c < o.wk.slots.length; c++) {
                                    const h = o.wk.secondarySlots[c]
                                      , d = g / 2 - (a + t) * o.wk.slots.length / 2 + (a + t) * c + t / 2;
                                    i.ej.fillStyle = (0,
                                    i.Lh)(n.Tj.unique, "#000000", .2),
                                    i.ej.fillRect(d, s, a, a),
                                    i.ej.fillStyle = n.Tj.unique,
                                    i.ej.fillRect(d + 3, s + 3, a - 6, a - 6),
                                    void 0 === h.icon && (h.icon = new o.xz,
                                    h.icon.realX = h.icon.x = d,
                                    h.icon.realY = h.icon.y = s,
                                    h.icon.realSize = h.icon.size = a),
                                    h.icon.interpolate(),
                                    h.icon.realX = d,
                                    h.icon.realY = s,
                                    h.icon.realSize = a,
                                    h.index > -1 && (!l.VE.enabled || l.VE.type !== l.Xn || l.VE.index !== c) && (i.ej.save(),
                                    i.ej.translate(h.icon.x, h.icon.y),
                                    i.ej.scale(h.icon.size, h.icon.size),
                                    i.ej.drawImage((0,
                                    r.GM)(h.index, h.rarity), 0, 0, 1, 1),
                                    i.ej.restore(),
                                    m > d && m < d + a && T > s && T < s + a && (o.wk.petalHover = [h.index, h.rarity],
                                    o.P5.left && !l.VE.enabled && ((0,
                                    l.TB)(d + e / 2, s + e / 2, e, h.index, h.rarity),
                                    l.VE.type = l.Xn,
                                    l.VE.index = c,
                                    l.VE.item.stableSize = a,
                                    l.VE.onDrop = () => {
                                        p() || (h.icon.x = o.P5.x / u - e / 2,
                                        h.icon.y = o.P5.y / u - e / 2)
                                    }
                                    ))),
                                    (0,
                                    i.Qq)(`[${(c + 1) % 10}]`, d + a / 2, s + a + t, 12)
                                }
                            }
                            if (o.wk.slots.length > 0) {
                                const e = g / 2 - (a + t) * o.wk.slots.length / 2 + (a + t) * o.wk.slots.length + t / 2 + a / 2
                                  , s = f - a - 2 * t;
                                o.wk.destroyIcon.realX = e,
                                o.wk.destroyIcon.realY = s,
                                o.wk.destroyIcon.realSize = a,
                                o.wk.destroyIcon.interpolate(),
                                i.ej.fillStyle = (0,
                                i.Lh)(n.Tj.skillTree, "#000000", .2),
                                i.ej.fillRect(e, s, a, a),
                                i.ej.fillStyle = n.Tj.skillTree,
                                i.ej.fillRect(e + 3, s + 3, a - 6, a - 6),
                                (0,
                                i.Qq)("Destroy", e + a / 2, s + a / 2, a / 5),
                                (0,
                                i.Qq)("[k]", e + a / 2, s + a + t, 12)
                            }
                        }
                        if (o.wk.socket?.readyState === WebSocket.OPEN) {
                            {
                                o.wk.levelProgress = (0,
                                n.Cc)(o.wk.levelProgress, o.wk.levelProgressTarget, .1),
                                o.wk.levelProgressTarget < o.wk.levelProgress && (o.wk.levelProgress = 0);
                                const e = o.wk.players.get(o.wk.playerID);
                                (0,
                                i.iA)(50, 275, 175, 37.5, n.Tj["???"]),
                                i.ej.save(),
                                i.ej.translate(50, 175),
                                i.ej.beginPath(),
                                i.ej.arc(0, 0, 35, 0, 2 * Math.PI),
                                (0,
                                i.eC)(n.Tj.playerYellow, 4),
                                i.ej.fill(),
                                i.ej.stroke(),
                                e ? ((0,
                                i.Ao)(14.875, e.facing, e.mood, e.mouthDip, e.attack ? 2 : e.defend ? 3 : 1),
                                (0,
                                i.iA)(70, 70 + 155 * e.secondaryHealthBar, 0, 25, n.Tj.legendary),
                                (0,
                                i.iA)(70, 70 + 155 * e.healthRatio, 0, 27.5, e.poisoned ? (0,
                                i.Lh)(n.Tj.common, n.Tj.irisPurple, .5 + .5 * Math.sin(performance.now() / 333 + 3 * e.id)) : n.Tj.common),
                                w.nameText = (0,
                                n.Cc)(w.nameText, 197.5, .1)) : ((0,
                                i.Ao)(14.875, 0, 1, 1, 1, !0),
                                w.nameText = (0,
                                n.Cc)(w.nameText, 180, .1)),
                                i.ej.restore(),
                                (0,
                                i.Qq)(o.wk.username, w.nameText, 175, 20),
                                (0,
                                i.iA)(175, 275, 210, 22.5, n.Tj["???"]),
                                (0,
                                i.iA)(175, 175 + 100 * o.wk.levelProgress, 210, 15, n.Tj.playerYellow),
                                (0,
                                i.Qq)("Level " + o.wk.level, 225, 210, 12)
                            }
                            {
                                const e = o.wk.terrain?.blocks?.length > 0
                                  , t = e ? 275 : Math.abs(1 - o.wk.room.width / o.wk.room.height) < .1 ? 150 : 200
                                  , a = Math.max(o.wk.room.width, o.wk.room.height)
                                  , r = o.wk.room.width / a * t
                                  , l = o.wk.room.height / a * t
                                  , c = g - r - 10
                                  , h = f - l - 10;
                                e ? i.ej.drawImage(o.wk.minimapImg, c, h, r, l) : (i.ej.fillStyle = s.hg[o.wk.room.biome].color,
                                i.ej.strokeStyle = "#444444",
                                i.ej.lineWidth = 5,
                                i.ej.beginPath(),
                                o.wk.room.isRadial ? i.ej.arc(c + r / 2, h + l / 2, r / 2, 0, 2 * Math.PI) : i.ej.roundRect(c, h, r, l, 10),
                                i.ej.fill(),
                                i.ej.stroke()),
                                i.ej.fillStyle = e ? n.Tj.peaGreen : n.Tj.playerYellow,
                                i.ej.beginPath(),
                                i.ej.arc(o.wk.camera.x / o.wk.room.width * r + c + r / 2, o.wk.camera.y / o.wk.room.height * l + h + l / 2, t * (e ? .0225 : .025), 0, 2 * Math.PI),
                                i.ej.fill()
                            }
                            {
                                i.ej.save(),
                                i.ej.translate(10, f - 10);
                                const e = .2 * g
                                  , t = []
                                  , a = o.cM.messages
                                  , s = 18;
                                for (let o = 0; o < a.length; o++)
                                    t.push((0,
                                    i.R3)(a[o].completeMessage, -2048, -2048, s, e));
                                i.ej.textAlign = "left",
                                i.ej.textBaseline = "middle";
                                let r = -10;
                                const l = t.reduce(( (e, t) => e + t), 0) + 10 * a.length + (o.cM.showInput ? 45 : 30);
                                if (w.chatBGSize = (0,
                                n.Cc)(w.chatBGSize, l, .1),
                                i.ej.fillStyle = "rgba(0, 0, 0, .5)",
                                i.ej.beginPath(),
                                i.ej.roundRect(-12, -w.chatBGSize - 10, e + 22, w.chatBGSize + 22, 5),
                                i.ej.fill(),
                                o.cM.showInput) {
                                    const e = o.cM.element;
                                    e.style.display = "block",
                                    e.style.left = 10 * u + "px",
                                    e.style.bottom = 10 * u + "px",
                                    e.style.width = .2 * +getComputedStyle(i.Ji).width.replace("px", "") - 10 * u + "px",
                                    e.style.height = 20 * u + "px",
                                    e.style.fontSize = s * u + "px",
                                    e.style.padding = 5 * u + "px",
                                    r -= 45
                                } else
                                    o.cM.element.style.display = "none",
                                    (0,
                                    i.Qq)("(Press Esc to open chat)", 0, r, s),
                                    r -= 30;
                                i.ej.textBaseline = "top",
                                r -= t[t.length - 1];
                                for (let l = a.length - 1; l >= 0; l--) {
                                    const c = a[l];
                                    if (c.y = (0,
                                    n.Cc)(c.y, r, .2),
                                    c.ticker++,
                                    c.ticker > 7.5 * F.fps - 2 * a.length)
                                        o.cM.messages.splice(l, 1);
                                    else {
                                        switch (c.type) {
                                        case 0:
                                            const t = (0,
                                            i.Qq)(c.username, 0, c.y, s, c.color);
                                            (0,
                                            i.R3)(": " + c.message, t, c.y, s, e - 5, "#FFFFFF", i.ej, 0);
                                            break;
                                        case 1:
                                            (0,
                                            i.R3)(c.message, 0, c.y, s, e - 5, c.color)
                                        }
                                        l > 0 && (r -= t[l - 1],
                                        r -= 10)
                                    }
                                }
                                i.ej.restore()
                            }
                        }
                        if (null !== o.wk.waveInfo && (i.ej.textBaseline = "middle",
                        (0,
                        i.Qq)("Wave " + o.wk.waveInfo.wave, g / 2, 30, 35),
                        (0,
                        i.iA)(g / 2 - 200, g / 2 + 200, 65, 30, n.Tj["???"]),
                        (0,
                        i.iA)(g / 2 - 200, g / 2 - 200 + o.wk.waveInfo.livingMobs / o.wk.waveInfo.maxMobs * 400, 65, 25, n.Tj.common),
                        (0,
                        i.Qq)(o.wk.waveInfo.livingMobs + " / " + o.wk.waveInfo.maxMobs, g / 2, 65, 22.5)),
                        null !== o.wk.petalHover) {
                            i.ej.save(),
                            i.ej.translate(g - 360, 10 + (n.fF.showDebug ? 40 : 0));
                            const e = (0,
                            r.eR)(...o.wk.petalHover);
                            i.ej.imageSmoothingEnabled = !0,
                            i.ej.imageSmoothingQuality = "high",
                            i.ej.drawImage(e, 0, 0, 350, 350 * e.height / e.width),
                            i.ej.restore()
                        }
                        (0,
                        l.sH)(m, T),
                        o.wk.isDead && (i.ej.fillStyle = "rgba(0, 0, 0, .2)",
                        i.ej.fillRect(0, 0, g, f),
                        (0,
                        i.Qq)("You died", g / 2, f / 2, 30),
                        (0,
                        i.Qq)(o.wk.killMessage, g / 2, f / 2 + 30, 15),
                        (0,
                        i.Qq)("(Press ENTER to respawn)", g / 2, f / 2 + 60, 15)),
                        n.fF.showDebug && (i.ej.textAlign = "right",
                        i.ej.textBaseline = "top",
                        (0,
                        i.Qq)(`C: ${F.fps} FPS | ${F.mspt.toFixed(2)} mspt`, g - 10, 10, 15),
                        (0,
                        i.Qq)(`S: ${o.wk.updateRate} UPS | ${+o.wk.ping.toFixed(2)} ms ping`, g - 10, 25, 15),
                        o.wk.socket ? (0,
                        i.Qq)(`B(I/O): ${o.wk.socket.bandWidth.in}/${o.wk.socket.bandWidth.out} KB/s`, g - 10, 40, 15) : (0,
                        i.Qq)("Not connected", g - 10, 40, 15),
                        i.ej.textAlign = "center",
                        i.ej.textBaseline = "middle"),
                        i.ej.restore(),
                        F.frames++,
                        F.totalTime += performance.now() - e
                    }
                    y(),
                    document.getElementById("usernameInputInput").value = localStorage.getItem("username") || "guest",
                    document.getElementById("gamemodeSelect").value = localStorage.getItem("gamemode") || "ffa",
                    document.getElementById("biomeSelect").value = localStorage.getItem("biome") || "default",
                    document.getElementById("enableMods").checked = "true" === localStorage.getItem("enableMods"),
                    document.getElementById("privateLobby").checked = "true" === localStorage.getItem("privateLobby"),
                    (0,
                    c.Sw)(),
                    (0,
                    c.fT)(),
                    t()
                } catch (v) {
                    t(v)
                }
            }
            ))
        }
        ,
        338: (e, t, a) => {
            a.d(t, {
                Ao: () => P,
                DZ: () => b,
                De: () => l,
                Ji: () => o,
                Lh: () => h,
                Qq: () => d,
                R3: () => j,
                Tv: () => E,
                Uo: () => A,
                dX: () => r,
                eC: () => u,
                ej: () => n,
                iA: () => g,
                jM: () => T
            });
            var i = a(874);
            const o = document.querySelector("canvas")
              , n = o.getContext("2d");
            function s() {
                o.width = window.innerWidth * window.devicePixelRatio,
                o.height = window.innerHeight * window.devicePixelRatio,
                n.lineCap = n.lineJoin = "round",
                n.textAlign = "center",
                n.textBaseline = "middle",
                n.imageSmoothingEnabled = !0,
                n.imageSmoothingQuality = "high"
            }
            function r() {
                return o.height > o.width ? o.height / 1080 : o.width / 1920
            }
            function l(e) {
                const t = o.width / e
                  , a = o.height / e / 1080 * 1920;
                return Math.max(t, a)
            }
            window.addEventListener("resize", s),
            s();
            const c = new Map;
            function h(e, t, a=.5) {
                const o = `${e}${t}${a}`;
                if (c.has(o))
                    return c.get(o);
                const n = parseInt(e.slice(1), 16)
                  , s = parseInt(t.slice(1), 16)
                  , r = `#${(1 << 24 | i.Cc(n >> 16 & 255, s >> 16 & 255, a) << 16 | i.Cc(n >> 8 & 255, s >> 8 & 255, a) << 8 | i.Cc(255 & n, 255 & s, a)).toString(16).slice(1)}`;
                return c.set(o, r),
                r
            }
            function d(e, t, a, i, o="#FFFFFF", s=n) {
                return s.fillStyle = o,
                s.strokeStyle = h(o, "#000000", .3),
                s.lineWidth = .15 * i,
                s.font = `bold ${i}px sans-serif`,
                s.strokeText(e, t, a),
                s.fillText(e, t, a),
                s.measureText(e).width
            }
            function u(e, t=.1, a=.2) {
                n.fillStyle = e,
                n.strokeStyle = h(e, "#000000", a),
                n.lineWidth = t
            }
            function g(e, t, a, i, o="#555555") {
                n.strokeStyle = o,
                n.lineWidth = i,
                n.beginPath(),
                n.moveTo(e, a),
                n.lineTo(t, a),
                n.closePath(),
                n.stroke()
            }
            const f = new Map;
            function m(e) {
                if (f.has(e))
                    return f.get(e);
                const t = new Image;
                return t.src = `./assets/${e}`,
                t.onload = () => {
                    t.ready = !0
                }
                ,
                f.set(e, t),
                t
            }
            function T(e, t, a, s=!1, r, l, c, h=!1) {
                if (n.fillStyle = null === c ? "rgba(200, 119, 85, 1)" : c.color,
                n.fillRect(0, 0, o.width, o.height),
                i.fF.useTileBackground && null !== c && c.tile) {
                    const i = m(c.tile);
                    if (i.ready) {
                        const s = i.width * a
                          , r = i.height * a;
                        for (let a = -e % s - s; a < o.width; a += s)
                            for (let e = -t % r - r; e < o.height; e += r)
                                n.drawImage(i, a - 1, e - 1, s + 2, r + 2)
                    }
                }
                if (s) {
                    const i = r * a
                      , s = l * a;
                    n.fillStyle = "rgba(0, 0, 0, .3)",
                    n.beginPath(),
                    n.rect(0, 0, o.width, o.height),
                    h ? n.arc(.5 * o.width - e, .5 * o.height - t, .5 * i, 0, 2 * Math.PI) : n.rect(.5 * o.width - e - .5 * i, .5 * o.height - t - .5 * s, i, s),
                    n.fill("evenodd")
                }
                if (!i.fF.hideGrid && !i.fF.useTileBackground) {
                    const i = 32 * a;
                    n.save(),
                    n.beginPath(),
                    n.globalAlpha = .075,
                    n.strokeStyle = "#000000",
                    n.lineWidth = 1.15 * a;
                    for (let t = (.5 * o.width - e) % i; t <= o.width; t += i)
                        n.moveTo(t, 0),
                        n.lineTo(t, o.height);
                    for (let e = (.5 * o.height - t) % i; e <= o.height; e += i)
                        n.moveTo(0, e),
                        n.lineTo(o.width, e);
                    n.stroke(),
                    n.closePath(),
                    n.restore()
                }
            }
            function b(e, t, a, i) {
                if (null !== i && i.alt) {
                    n.globalAlpha = .2;
                    const s = m(i.alt)
                      , r = performance.now() / 750
                      , l = e + r * a
                      , c = t + 4 * Math.sin(r) * a;
                    if (s.ready) {
                        const e = s.width * a
                          , t = s.height * a;
                        for (let a = -l % e - e; a < o.width; a += e)
                            for (let i = -c % t - t; i < o.height; i += t)
                                n.drawImage(s, a, i, e, t)
                    }
                    n.globalAlpha = 1
                }
            }
            const k = 2 * Math.PI
              , p = -Math.PI / 10
              , F = p + Math.PI / 2
              , w = .334 - .15;
            function y(e, t, a, i, o, s=!0) {
                switch (n.save(),
                n.translate(e, t),
                n.beginPath(),
                o) {
                case 1:
                case 3:
                    n.ellipse(0, 0, .334, .667, 0, 0, k);
                    break;
                case 2:
                    s ? n.ellipse(0, 0, .334, .667, 0, p, p - F * (i / 2)) : n.ellipse(0, 0, .334, .667, 0, p - F * (i / 2), Math.PI - p)
                }
                n.closePath(),
                n.fillStyle = "#04190E",
                n.strokeStyle = "#04190E",
                n.lineWidth = .075,
                n.stroke(),
                n.fill(),
                n.clip(),
                n.beginPath(),
                n.arc(Math.cos(a) * w, Math.sin(a) * w * 2.15, .3, 0, k),
                n.fillStyle = "#FFFFFF",
                n.fill(),
                n.closePath(),
                n.restore()
            }
            function v(e, t) {
                n.save(),
                n.translate(e, t),
                n.beginPath(),
                n.moveTo(-.4, -.4),
                n.lineTo(.4, .4),
                n.moveTo(.4, -.4),
                n.lineTo(-.4, .4),
                n.strokeStyle = "#000000",
                n.lineWidth = .2,
                n.stroke(),
                n.restore()
            }
            function P(e, t, a, i, o, s=!1) {
                n.scale(e, e),
                s ? (v(-.75, -.5),
                v(.75, -.5)) : (y(-.75, -.5, t, a, o),
                y(.75, -.5, t, a, o, !1)),
                function(e) {
                    n.beginPath(),
                    n.moveTo(-.75, 1.16),
                    n.quadraticCurveTo(0, e, .75, 1.16),
                    n.strokeStyle = "#04190E",
                    n.lineWidth = .2,
                    n.lineCap = "round",
                    n.stroke(),
                    n.closePath()
                }(i),
                n.scale(1 / e, 1 / e)
            }
            function j(e, t, a, i, o, s="#FFFFFF", r=n, l=t) {
                r.font = `bold ${i}px sans-serif`,
                r.strokeStyle = h(s, "#000000", .3),
                r.lineWidth = .2 * i,
                r.fillStyle = s;
                const c = []
                  , d = e.split(" ");
                let u = "";
                for (let e = 0; e < d.length; e++) {
                    if (r.measureText(d[e]).width > o) {
                        const t = []
                          , a = d[e];
                        let i = "";
                        for (let e = 0; e < a.length; e++)
                            r.measureText(i + a[e]).width > o && (t.push(i),
                            i = ""),
                            i += a[e];
                        t.push(i),
                        d.splice(e, 1, ...t),
                        e--;
                        continue
                    }
                    const t = u + d[e] + " ";
                    r.measureText(t).width > o && e > 0 ? (c.push(u),
                    u = d[e] + " ") : u = t
                }
                c.push(u);
                for (let e = 0; e < c.length; e++)
                    r.strokeText(c[e], e > 0 ? l : t, a + i * e),
                    r.fillText(c[e], e > 0 ? l : t, a + i * e);
                return r.measureText("M").width * c.length
            }
            const C = "#68472E"
              , M = "#4F3422"
              , S = 96;
            function x() {
                const e = document.createElement("canvas");
                e.width = S,
                e.height = S;
                const t = e.getContext("2d");
                t.imageSmoothingEnabled = !0,
                t.imageSmoothingQuality = "high",
                t.fillStyle = C,
                t.fillRect(0, 0, S, S),
                t.fillStyle = M;
                const a = [];
                for (let e = 0, i = 5 + 8 * Math.random() | 0; e < i; e++) {
                    let e = 0;
                    for (; ++e < 128; ) {
                        const e = 4 + 4 * Math.random()
                          , i = e + Math.random() * (S - 2 * e)
                          , o = e + Math.random() * (S - 2 * e);
                        if (!a.some((t => Math.sqrt((t.x - i) ** 2 + (t.y - o) ** 2) < t.size + e + 4))) {
                            t.beginPath(),
                            t.arc(i, o, e, 0, 2 * Math.PI),
                            t.fill(),
                            a.push({
                                x: i,
                                y: o,
                                size: e
                            });
                            break
                        }
                    }
                }
                return e
            }
            function A(e, t, a, i) {
                const o = document.createElement("canvas")
                  , n = o.getContext("2d");
                o.width = e,
                o.height = t,
                n.imageSmoothingEnabled = !0,
                n.imageSmoothingQuality = "high",
                n.lineCap = n.lineJoin = "round";
                const s = e / a / 2;
                n.beginPath();
                for (const e of i) {
                    const t = 2 * (e.x + .5) * s
                      , a = 2 * (e.y + .5) * s
                      , i = e.terrain;
                    n.moveTo(t + i[0].x * s, a + i[0].y * s);
                    for (let e = 1; e < i.length; e++)
                        n.lineTo(t + i[e].x * s, a + i[e].y * s);
                    n.lineTo(t + i[0].x * s, a + i[0].y * s)
                }
                n.strokeStyle = "rgba(0, 0, 0, .3)",
                n.lineWidth = .2 * s,
                n.stroke();
                const r = n.createPattern(function(e, t) {
                    const a = document.createElement("canvas");
                    a.width = S * e,
                    a.height = S * t;
                    const i = a.getContext("2d");
                    i.imageSmoothingEnabled = !0,
                    i.imageSmoothingQuality = "high";
                    for (let a = 0; a < t; a++)
                        for (let t = 0; t < e; t++)
                            i.drawImage(x(), t * S, a * S);
                    return a
                }(4, 4), "repeat");
                return n.fillStyle = r,
                n.strokeStyle = M,
                n.lineWidth = .1 * s,
                n.stroke(),
                n.fill(),
                o
            }
            function E(e, t) {
                const a = document.createElement("canvas")
                  , i = a.getContext("2d");
                a.width = 512,
                a.height = 512,
                i.imageSmoothingEnabled = !0,
                i.imageSmoothingQuality = "high",
                i.lineCap = i.lineJoin = "round";
                const o = 512 / e / 2;
                i.fillStyle = "#FFFFFF",
                i.fillRect(0, 0, 512, 512),
                i.fillStyle = "#000000",
                i.beginPath();
                for (const e of t) {
                    const t = 2 * (e.x + .5) * o
                      , a = 2 * (e.y + .5) * o;
                    i.rect(t - o, a - o, 2 * o, 2 * o)
                }
                return i.fill(),
                a
            }
        }
        ,
        938: (e, t, a) => {
            a.a(e, (async (e, i) => {
                try {
                    a.d(t, {
                        TB: () => f,
                        Ux: () => d,
                        VE: () => h,
                        Xn: () => u,
                        sH: () => m,
                        tq: () => g
                    });
                    var o = a(338)
                      , n = a(703)
                      , s = a(917)
                      , r = a(874)
                      , l = e([n, s]);
                    [n,s] = l.then ? (await l)() : l;
                    class c {
                        index = 0;
                        rarity = 0;
                        x = 0;
                        y = 0;
                        size = 0;
                        ratio = 0;
                        realX = 0;
                        realY = 0;
                        realSize = 0;
                        stableSize = 0
                    }
                    const h = {
                        item: null,
                        enabled: !1,
                        isReleasing: !1,
                        type: -1,
                        index: -1,
                        onDrop: function() {}
                    }
                      , d = 0
                      , u = 1
                      , g = 2;
                    function f(e, t, a, i, o) {
                        const n = new c;
                        n.x = e,
                        n.y = t,
                        n.size = a,
                        n.realX = e,
                        n.realY = t,
                        n.realSize = a,
                        n.stableSize = a,
                        n.index = i,
                        n.rarity = o,
                        h.item = n,
                        h.enabled = !0,
                        h.isReleasing = !1
                    }
                    function m(e, t) {
                        if (h.enabled) {
                            if (!n.P5.left || h.isReleasing ? h.isReleasing = !0 : (h.item.realX = e,
                            h.item.realY = t),
                            h.item.x = (0,
                            r.Cc)(h.item.x, h.item.realX, .2),
                            h.item.y = (0,
                            r.Cc)(h.item.y, h.item.realY, .2),
                            h.item.size = (0,
                            r.Cc)(h.item.size, h.item.realSize, .2),
                            h.isReleasing) {
                                const e = h.item.x - h.item.realX
                                  , t = h.item.y - h.item.realY;
                                if (Math.sqrt(e * e + t * t) < h.item.size)
                                    return h.isReleasing = !1,
                                    h.enabled = !1,
                                    h.onDrop(h.item),
                                    void (h.item = null)
                            }
                            o.ej.save(),
                            o.ej.textAlign = "center",
                            o.ej.translate(h.item.x, h.item.y),
                            o.ej.scale(h.item.size, h.item.size),
                            o.ej.rotate(.3 * Math.sin(performance.now() / 250)),
                            o.ej.drawImage((0,
                            s.GM)(h.item.index, h.item.rarity), -.5, -.5, 1, 1),
                            o.ej.restore(),
                            h.item.realSize = h.item.stableSize
                        } else
                            h.item = null
                    }
                    i()
                } catch (T) {
                    i(T)
                }
            }
            ))
        }
        ,
        768: (e, t, a) => {
            a.d(t, {
                Sw: () => c,
                fT: () => d
            });
            var i = a(338)
              , o = a(874);
            const n = document.getElementById("topButtons")
              , s = document.getElementById("menus")
              , r = ["#C8C8C8", "#88C8BA", "#C8BA88", "#7289DA", "#C88888"]
              , l = n.querySelector("#closeButton");
            for (let e = 0; e < 5; e++) {
                const t = n.children.item(e);
                t.style.backgroundColor = r[e % r.length],
                t.style.borderColor = (0,
                i.Lh)(r[e % r.length], "#000000", .2);
                const a = new Image;
                if (a.src = "./assets/" + t.id + ".svg",
                a.onload = function() {
                    t.appendChild(a)
                }
                ,
                4 === e)
                    t.onclick = function() {
                        for (let e = 0; e < s.children.length; e++)
                            s.children.item(e).classList.remove("active");
                        l.classList.add("inactive")
                    }
                    ;
                else if (3 === e)
                    t.onclick = function() {
                        window.open("https://discord.gg/floof-1068705909607501914")
                    }
                    ;
                else {
                    const a = s.children.item(e);
                    a.style.backgroundColor = r[e % r.length],
                    a.style.borderColor = (0,
                    i.Lh)(r[e % r.length], "#000000", .2),
                    t.onclick = function() {
                        if (a.classList.contains("active")) {
                            for (let e = 0; e < s.children.length; e++)
                                s.children.item(e).classList.remove("active");
                            l.classList.add("inactive")
                        } else {
                            for (let e = 0; e < s.children.length; e++)
                                s.children.item(e).classList.remove("active");
                            a.classList.toggle("active"),
                            l.classList.remove("inactive")
                        }
                    }
                }
            }
            function c() {
                document.getElementById("menuContainer").classList.add("active")
            }
            function h(e, t) {
                const a = document.getElementById(t);
                a.onchange = function() {
                    o.fF[e] = a.checked,
                    localStorage.setItem("options-" + e, a.checked)
                }
                ,
                a.checked = o.fF[e],
                "true" === localStorage.getItem("options-" + e) && (a.checked = !0,
                o.fF[e] = !0)
            }
            async function d() {
                const e = [];
                try {
                    const t = await (await fetch("./assets/changelog.md")).text();
                    e.push(...t.split("\n"))
                } catch (e) {
                    return !1
                }
                const t = e[0];
                if (localStorage.getItem("latestChangelog") !== t) {
                    const e = document.querySelector("button#changelogMenu")
                      , a = new Image;
                    a.src = "./assets/alert.svg",
                    a.classList.add("alert"),
                    e.appendChild(a),
                    e.addEventListener("click", ( () => {
                        e.removeChild(a),
                        localStorage.setItem("latestChangelog", t)
                    }
                    ))
                }
                const a = document.querySelector(".menu#changelogMenu");
                for (; e.length; ) {
                    const t = e.shift();
                    if (!t.startsWith("#"))
                        return console.warn("Invalid first line of block:", t),
                        !1;
                    const i = document.createElement("span");
                    i.textContent = t.slice(2),
                    a.appendChild(i);
                    const o = document.createElement("ul");
                    for (; ; ) {
                        const t = e.shift();
                        if (!t || !t.startsWith("-")) {
                            a.appendChild(document.createElement("br"));
                            break
                        }
                        const i = document.createElement("li");
                        i.textContent = t.slice(2),
                        i.style.fontWeight = "normal",
                        o.appendChild(i)
                    }
                    a.appendChild(o)
                }
                return !0
            }
            h("showDebug", "show-debug"),
            h("hideGrid", "hide-grid"),
            h("rigidInterpolation", "rigid-interpolation"),
            h("mouseMovement", "mouse-movement"),
            h("hideEntityUI", "hide-entity-ui"),
            h("useTileBackground", "use-tile-background"),
            h("fancyGraphics", "extra-graphics"),
            h("showHitboxes", "show-hitboxes")
        }
        ,
        703: (e, t, a) => {
            a.a(e, (async (e, i) => {
                try {
                    a.d(t, {
                        Aw: () => k,
                        Kd: () => E,
                        P5: () => L,
                        X0: () => q,
                        cM: () => M,
                        sA: () => F,
                        wk: () => A,
                        xz: () => x
                    });
                    var o = a(338)
                      , n = a(110)
                      , s = a(917)
                      , r = a(874)
                      , l = e([s]);
                    function c() {
                        const e = navigator.userAgent;
                        let t = "unknown"
                          , a = "unknown";
                        return e.includes("Firefox") ? (t = "Firefox",
                        a = parseInt(e.match(/Firefox\/([\d]+)/)?.[1])) : e.includes("Edg") ? (t = "Edge",
                        a = parseInt(e.match(/Edg\/([\d]+)/)?.[1])) : e.includes("Chrome") && !e.includes("Edg") ? (t = "Chrome",
                        a = parseInt(e.match(/Chrome\/([\d]+)/)?.[1])) : e.includes("Safari") && !e.includes("Chrome") ? (t = "Safari",
                        a = parseInt(e.match(/Version\/([\d]+)/)?.[1])) : e.includes("OPR") && (t = "Opera",
                        a = parseInt(e.match(/OPR\/([\d]+)/)?.[1])),
                        {
                            name: t,
                            version: a
                        }
                    }
                    function h() {
                        const e = navigator.userAgent
                          , t = navigator.userAgentData
                          , a = navigator.platform
                          , i = {
                            Windows: /Win/i,
                            "Mac OS": /Mac/i,
                            iOS: /iPhone|iPad|iPod/i,
                            Android: /Android/i,
                            Linux: /Linux/i,
                            Unix: /X11/i
                        }
                          , o = {
                            Windows: /Windows/i,
                            "Mac OS": /Mac OS/i,
                            iOS: /like Mac OS/i,
                            Android: /Android/i,
                            Linux: /Linux/i,
                            Unix: /Unix/i
                        }
                          , n = {
                            Windows: /Windows/i,
                            "Mac OS": /Mac OS/i,
                            iOS: /like Mac OS/i,
                            Android: /Android/i,
                            Linux: /Linux/i,
                            Unix: /Unix/i
                        };
                        let s = "Unknown";
                        for (const [e,t] of Object.entries(i))
                            if (t.test(a)) {
                                s = e;
                                break
                            }
                        for (const [t,a] of Object.entries(o))
                            if (a.test(e)) {
                                s = t;
                                break
                            }
                        if (t)
                            for (const [e,a] of Object.entries(n))
                                if (a.test(t.platform)) {
                                    s = e;
                                    break
                                }
                        return s
                    }
                    function d(e) {
                        const t = /NVIDIA\s+(GeForce|Quadro|RTX|GTX)\s+([A-Za-z0-9\s]+)/i
                          , a = /AMD\s+(Radeon|RX)\s+([A-Za-z0-9\s]+)/i
                          , i = /Intel\s+(Iris|UHD|Xe)\s+([A-Za-z0-9\s]+)/i;
                        if (t.test(e)) {
                            const [,a,i] = e.match(t);
                            return `NVIDIA ${a} ${i.trim()}`
                        }
                        if (a.test(e)) {
                            const [,t,i] = e.match(a);
                            return `AMD ${t} ${i.trim()}`
                        }
                        if (i.test(e)) {
                            const [,t,a] = e.match(i);
                            return `Intel ${t} ${a.trim()}`
                        }
                        return "Other"
                    }
                    async function u() {
                        return new Promise((e => {
                            const t = new Blob(["\n            onmessage = function() {\n                let startTime = performance.now();\n                for (let i = 0; i < 1e7; i++) {}\n                let endTime = performance.now();\n                postMessage(endTime - startTime);\n            };\n        "],{
                                type: "application/javascript"
                            })
                              , a = new Worker(URL.createObjectURL(t));
                            a.onmessage = t => {
                                e(t.data),
                                a.terminate()
                            }
                            ,
                            a.postMessage(null)
                        }
                        ))
                    }
                    async function g() {
                        const e = document.createElement("canvas").getContext("webgl") || document.createElement("canvas").getContext("experimental-webgl")
                          , t = e?.getExtension("WEBGL_debug_renderer_info")
                          , a = c()
                          , i = {
                            screen: `${screen.width}x${screen.height}`,
                            hardware: {
                                gl: +!!window.WebGLRenderingContext,
                                gl2: +!!window.WebGL2RenderingContext,
                                minCores: navigator.hardwareConcurrency,
                                minMem: navigator.deviceMemory ?? 0,
                                gpu: d(t ? e.getParameter(t.UNMASKED_RENDERER_WEBGL) : "unknown"),
                                os: h(),
                                bench: await u()
                            },
                            browser: {
                                name: a.name,
                                version: a.version
                            },
                            locale: navigator.language,
                            tzOff: -(new Date).getTimezoneOffset() / 60,
                            dst: +((new Date).getTimezoneOffset() < Math.max(new Date((new Date).getFullYear(),0,1).getTimezoneOffset(), new Date((new Date).getFullYear(),6,1).getTimezoneOffset())),
                            isMobile: +/Android|webOS|iPhone|iPad|iPod|BlackBerry|android|mobi/i.test(navigator.userAgent)
                        }
                          , o = navigator.userAgentData;
                        if (o) {
                            if (o.brands.length > 0) {
                                const e = o.brands.find((e => e.version == i.browser.version))?.brand;
                                e && (i.browser.name = e)
                            }
                            i.isMobile = +o.mobile
                        }
                        return i
                    }
                    async function f() {
                        const e = await g();
                        return btoa(JSON.stringify(e))
                    }
                    s = (l.then ? (await l)() : l)[0];
                    const m = encodeURIComponent(await f());
                    async function T() {
                        const e = localStorage.getItem("uuid");
                        let t = !1;
                        if (e) {
                            const [a,i] = e.split(":");
                            Date.now() < Number(i) && (t = a)
                        }
                        const a = await fetch(r.UB + "/uuid/get?existing=" + t).then((e => e.json()));
                        if (!a.ok)
                            throw new Error("Failed to get UUID data");
                        return localStorage.setItem("uuid", a.uuid + ":" + (Date.now() + 864e5)),
                        a.uuid
                    }
                    const b = await T();
                    async function k() {
                        const e = await fetch(r.UB + "/lobby/list");
                        return await e.json()
                    }
                    console.log("UUID", b);
                    class p {
                        #e = new Map;
                        #t = 0;
                        #a = null;
                        constructor() {
                            this.#a = new BroadcastChannel("floofModdingAPI"),
                            this.#a.onmessage = e => this.#i(e.data),
                            console.log("Modding API initialized"),
                            window.floof = this
                        }
                        #i(e) {
                            const t = this.#e.get(e[0]);
                            if (!t)
                                throw new Error("Invalid job ID");
                            if (null !== e[2]) {
                                let t = new n.lm("",0,0,0);
                                if (0 === e[2]) {
                                    t = Object.assign(t, structuredClone(e[1].data));
                                    for (const a in e[1].data) {
                                        const i = structuredClone(e[1].data[a]);
                                        switch (a) {
                                        case "drawing":
                                            t[a] = Object.assign(new n.H1, i);
                                            break;
                                        case "tiers":
                                            for (let e = 0; e < i.length; e++)
                                                t[a][e] = Object.assign(new n.z(0,0,0), i[e])
                                        }
                                    }
                                }
                                e[1].data = t
                            }
                            t(e[1])
                        }
                        #o(...e) {
                            return new Promise((t => {
                                const a = this.#t++;
                                this.#e.set(a, t),
                                this.#a.postMessage([a, ...e])
                            }
                            ))
                        }
                        syncPetalIndex(e) {
                            return A.petalConfigs.findIndex((t => t.name === e))
                        }
                        syncMobIndex(e) {
                            return A.mobConfigs.findIndex((t => t.name === e))
                        }
                        syncRarityIndex(e) {
                            return A.tiers.findIndex((t => t.name === e))
                        }
                        syncNextAvailablePetalIndex() {
                            return A.petalConfigs.length
                        }
                        syncNextAvailableMobIndex() {
                            return A.mobConfigs.length
                        }
                        help() {
                            window.open("/moddingAPI/index.html", "_blank")
                        }
                        get Drawing() {
                            return n.H1
                        }
                        get PetalConfig() {
                            return n.lm
                        }
                        get MobConfig() {
                            return n.XE
                        }
                        async spawnMob(e, t) {
                            return "string" == typeof e && -1 === (e = this.syncMobIndex(e)) ? {
                                ok: !1,
                                message: "Invalid mob name",
                                data: null
                            } : "string" == typeof t && -1 === (t = this.syncRarityIndex(t)) ? {
                                ok: !1,
                                message: "Invalid rarity name",
                                data: null
                            } : await this.#o("spawnMob", e, t)
                        }
                        async setRoomInfo(e, t, a, i) {
                            return await this.#o("setRoomInfo", e, t, a, i)
                        }
                        async getRoomInfo() {
                            return await this.#o("getRoomInfo")
                        }
                        async getPlayers() {
                            return await this.#o("getPlayers")
                        }
                        async getMobs() {
                            return await this.#o("getMobs")
                        }
                        async getPetalInfo(e) {
                            return "string" == typeof e && -1 === (e = this.syncPetalIndex(e)) ? {
                                ok: !1,
                                message: "Invalid petal name",
                                data: null
                            } : "number" != typeof e || void 0 === A.petalConfigs[e] ? {
                                ok: !1,
                                message: "Index must be a number pointing to an existing petal",
                                data: null
                            } : await this.#o("getPetalInfo", e)
                        }
                        async createCustomPetal(e) {
                            return e instanceof n.lm ? e.drawing ? (e.drawing = e.drawing.toString(),
                            await this.#o("createCustomPetal", e)) : {
                                ok: !1,
                                message: "Drawing is a required option",
                                data: null
                            } : {
                                ok: !1,
                                message: "Options must be a PetalConfig object",
                                data: null
                            }
                        }
                        async editPetal(e) {
                            return e instanceof n.lm ? (e.drawing && (e.drawing = e.drawing.toString()),
                            await this.#o("editPetal", e)) : {
                                ok: !1,
                                message: "Options must be a PetalConfig object",
                                data: null
                            }
                        }
                        async deletePetal(e) {
                            return "string" == typeof e && -1 === (e = this.syncPetalIndex(e)) ? {
                                ok: !1,
                                message: "Invalid petal name",
                                data: null
                            } : "number" != typeof e || void 0 === A.petalConfigs[e] ? {
                                ok: !1,
                                message: "Index must be a number pointing to an existing petal",
                                data: null
                            } : await this.#o("deletePetal", e)
                        }
                        async setSlot(e, t, a, i) {
                            return "string" == typeof a && -1 === (a = this.syncPetalIndex(a)) ? {
                                ok: !1,
                                message: "Invalid petal name",
                                data: null
                            } : "string" == typeof i && -1 === (i = this.syncRarityIndex(i)) ? {
                                ok: !1,
                                message: "Invalid rarity name",
                                data: null
                            } : await this.#o("setSlot", e, t, a, i)
                        }
                        async setSlotAmount(e, t) {
                            return await this.#o("setSlotAmount", e, t)
                        }
                    }
                    function F(e, t, a, i, o) {
                        let s = 0;
                        switch (o) {
                        case "default":
                            s = n.VC.DEFAULT;
                            break;
                        case "garden":
                            s = n.VC.GARDEN;
                            break;
                        case "desert":
                            s = n.VC.DESERT;
                            break;
                        case "ocean":
                            s = n.VC.OCEAN;
                            break;
                        case "antHell":
                            s = n.VC.ANT_HELL;
                            break;
                        case "sewers":
                            s = n.VC.SEWERS;
                            break;
                        case "hell":
                            s = n.VC.HELL;
                            break;
                        default:
                            return new Promise((e => e({
                                ok: !1,
                                error: "Invalid biome"
                            })))
                        }
                        return new Promise((o => {
                            const n = setTimeout(( () => o({
                                ok: !1,
                                error: "Timeout error"
                            })), 5e3)
                              , l = new WebSocket(`${r.UB.replace("http", "ws")}/ws/lobby?gameName=${e}&isModded=${a ? "yes" : "no"}&isPrivate=${i ? "yes" : "no"}&gamemode=${t}&biome=${s}&analytics=${m}`);
                            l.binaryType = "arraybuffer",
                            l.onopen = () => {
                                console.log("Connected to server");
                                const e = new Worker("./server/index.js",{
                                    type: "module"
                                });
                                e.postMessage(["start", t, a, b, s]),
                                l.onmessage = t => {
                                    const a = new Uint8Array(t.data);
                                    if (255 === a[0]) {
                                        clearTimeout(n);
                                        return 1 === a[1] || o({
                                            ok: !1,
                                            error: "Request rejected by server"
                                        }),
                                        void o({
                                            ok: !0,
                                            party: (new TextDecoder).decode(a.slice(2, -1)),
                                            worker: e,
                                            socket: l
                                        })
                                    }
                                    e.postMessage(a)
                                }
                                ,
                                e.onmessage = ({data: e}) => {
                                    l.readyState === WebSocket.OPEN && l.send(e)
                                }
                                ,
                                l.onclose = () => {
                                    console.log("Disconnected from server"),
                                    e.terminate()
                                }
                                ,
                                a && new p
                            }
                        }
                        ))
                    }
                    class w {
                        constructor(e) {
                            this.id = e,
                            this.x = 0,
                            this.y = 0,
                            this.size = 1,
                            this.facing = 0,
                            this.hit = !1,
                            this.realX = 0,
                            this.realY = 0,
                            this.realSize = 1,
                            this.realFacing = 0
                        }
                        interpolate() {
                            this.x = r.Cc(this.x, this.realX, A.interpolationFactor),
                            this.y = r.Cc(this.y, this.realY, A.interpolationFactor),
                            this.size = r.Cc(this.size, this.realSize, A.interpolationFactor),
                            this.facing = r.nU(this.facing, this.realFacing, A.interpolationFactor)
                        }
                    }
                    class y extends w {
                        constructor(e) {
                            super(e),
                            this.name = "",
                            this.nameColor = "#FFFFFF",
                            this.healthRatio = 1,
                            this.shieldRatio = 0,
                            this.realHealthRatio = 1,
                            this.realShieldRatio = 0,
                            this.rarity = 0,
                            this.level = 0,
                            this.mood = 0,
                            this.mouthDip = 0,
                            this.attack = !1,
                            this.defend = !1,
                            this.poisoned = !1,
                            this.wearing = 0,
                            this.team = 0,
                            this.lastHealthLoweredAt = 0,
                            this.secondaryHealthBar = 0
                        }
                        interpolate() {
                            super.interpolate(),
                            Math.abs(this.realHealthRatio - this.healthRatio) > .01 && this.healthRatio > this.realHealthRatio && (this.lastHealthLoweredAt = performance.now()),
                            this.secondaryHealthBar = Math.max(this.healthRatio, this.secondaryHealthBar),
                            performance.now() - this.lastHealthLoweredAt > 256 && (this.secondaryHealthBar = r.Cc(this.secondaryHealthBar, this.healthRatio, .75 * A.interpolationFactor)),
                            this.healthRatio = r.Cc(this.healthRatio, this.realHealthRatio, A.interpolationFactor),
                            this.shieldRatio = r.Cc(this.shieldRatio, this.realShieldRatio, A.interpolationFactor)
                        }
                    }
                    class v extends w {
                        constructor(e) {
                            super(e),
                            this.index = 0
                        }
                    }
                    class P extends w {
                        constructor(e) {
                            super(e),
                            this.index = 0,
                            this.rarity = 0,
                            this.attack = !1,
                            this.poisoned = !1,
                            this.friendly = !1,
                            this.healthRatio = 1,
                            this.realHealthRatio = 1,
                            this.extraData = void 0,
                            this.lastHealthLoweredAt = 0,
                            this.secondaryHealthBar = 0
                        }
                        interpolate() {
                            if (super.interpolate(),
                            Math.abs(this.realHealthRatio - this.healthRatio) > .01 && this.healthRatio > this.realHealthRatio && (this.lastHealthLoweredAt = performance.now()),
                            this.secondaryHealthBar = Math.max(this.healthRatio, this.secondaryHealthBar),
                            performance.now() - this.lastHealthLoweredAt > 256 && (this.secondaryHealthBar = r.Cc(this.secondaryHealthBar, this.healthRatio, .75 * A.interpolationFactor)),
                            this.healthRatio = r.Cc(this.healthRatio, this.realHealthRatio, A.interpolationFactor),
                            this.extraData instanceof s.zM && this.extraData.update(this.healthRatio),
                            this.extraData instanceof Array)
                                for (const e of this.extraData)
                                    e.x = r.Cc(e.x, e.realX, A.interpolationFactor),
                                    e.y = r.Cc(e.y, e.realY, A.interpolationFactor)
                        }
                    }
                    class j {
                        constructor(e) {
                            this.id = e,
                            this.x = 0,
                            this.y = 0,
                            this.size = 1,
                            this.creation = 0,
                            this.timer = 0
                        }
                        get tick() {
                            return (Date.now() - this.creation) / this.timer
                        }
                    }
                    class C {
                        static TIME_ALIVE = 1e3;
                        constructor(e) {
                            this.id = e,
                            this.points = [],
                            this.tick = performance.now()
                        }
                        improvePoints() {
                            const e = structuredClone(this.points)
                              , t = [];
                            for (let a = 0; a < e.length - 1; a++) {
                                const i = e[a]
                                  , o = e[a + 1];
                                t.push(i);
                                for (let e = 1; e < 6; e++) {
                                    const a = r.Cc(i.x, o.x, e / 6) + 50 * (Math.random() - .5)
                                      , n = r.Cc(i.y, o.y, e / 6) + 50 * (Math.random() - .5);
                                    t.push({
                                        x: a,
                                        y: n
                                    })
                                }
                            }
                            t.push(e[e.length - 1]),
                            this.points = t
                        }
                        get alpha() {
                            const e = performance.now();
                            return e - this.tick > C.TIME_ALIVE ? 0 : 1 - (e - this.tick) / C.TIME_ALIVE
                        }
                    }
                    class M {
                        constructor(e, ...t) {
                            switch (this.type = e,
                            e) {
                            case 0:
                                this.username = t[0],
                                this.message = t[1],
                                this.color = t[2],
                                this.completeMessage = this.username + ": " + this.message;
                                break;
                            case 1:
                                this.message = t[0],
                                this.color = t[1],
                                this.completeMessage = this.message
                            }
                            this.y = 300,
                            this.ticker = 0,
                            M.messages.push(this)
                        }
                        static messages = [];
                        static showInput = !1;
                        static element = document.getElementById("chatInput");
                        static send() {
                            const e = M.element.value.trim();
                            e.length > 0 && (A.socket?.talk(n.fh.CHAT_MESSAGE, e),
                            M.element.value = ""),
                            M.showInput = !1
                        }
                    }
                    new M(1,"Welcome to the game!","#FFFFFF");
                    class S extends WebSocket {
                        constructor(e, t) {
                            super(e),
                            this.binaryType = "arraybuffer",
                            this.username = t,
                            this.addEventListener("open", this.onOpen.bind(this)),
                            this.addEventListener("close", this.onClose.bind(this)),
                            this.addEventListener("message", this.onMessage.bind(this)),
                            this.lobbyID = "",
                            localStorage.token?.length > 4 && (window.floof_dev = {
                                spawnMob: (e, t) => {
                                    this.talk(n.fh.DEV_CHEAT, {
                                        id: n.F6.SPAWN_MOB,
                                        index: e,
                                        rarity: t
                                    })
                                }
                                ,
                                setPetal: (e, t, a, i) => {
                                    this.talk(n.fh.DEV_CHEAT, {
                                        id: n.F6.SET_PETAL,
                                        clientID: e,
                                        slotID: t,
                                        index: a,
                                        rarity: i
                                    })
                                }
                                ,
                                setXP: (e, t) => {
                                    this.talk(n.fh.DEV_CHEAT, {
                                        id: n.F6.SET_XP,
                                        clientID: e,
                                        xp: t
                                    })
                                }
                                ,
                                infoDump: () => {
                                    this.talk(n.fh.DEV_CHEAT, n.F6.INFO_DUMP)
                                }
                            }),
                            this._dataIn = 0,
                            this._dataOut = 0,
                            this.bandWidth = {
                                in: 0,
                                out: 0
                            },
                            this.bandwidthTracker = setInterval(( () => {
                                this.bandWidth.in = (this._dataIn / 1024).toFixed(2),
                                this.bandWidth.out = (this._dataOut / 1024).toFixed(2),
                                this._dataIn = 0,
                                this._dataOut = 0
                            }
                            ), 1e3)
                        }
                        onOpen() {
                            console.log("Connected to lobby"),
                            this.verify(this.username),
                            setTimeout(( () => this.ping()), 1e3)
                        }
                        onClose() {
                            console.log("Disconnected from lobby"),
                            A.disconnected = !0
                        }
                        onMessage(e) {
                            const t = new n.mP(new DataView(new Uint8Array(e.data).buffer),0,!0);
                            switch (this._dataIn += e.data.byteLength,
                            t.getUint8()) {
                            case n.de.KICK:
                                A.disconnectMessage = "Kicked: " + t.getStringUTF8();
                                break;
                            case n.de.READY:
                                console.log("Ready"),
                                this.spawn();
                                break;
                            case n.de.WORLD_UPDATE:
                                let e;
                                for (A.updatesCounter++,
                                A.camera.realX = t.getFloat32(),
                                A.camera.realY = t.getFloat32(),
                                A.camera.realFov = t.getFloat32(),
                                A.playerID = t.getUint32(); e = t.getUint32(),
                                e > 0; ) {
                                    const a = t.getUint8();
                                    let i = A.players.get(e);
                                    if (i || (i = new y(e),
                                    A.players.set(e, i)),
                                    a !== n.w6.NEW)
                                        if (a !== n.w6.DIE) {
                                            if (a & n.w6.POSITION && (i.realX = t.getFloat32(),
                                            i.realY = t.getFloat32()),
                                            a & n.w6.SIZE && (i.realSize = t.getFloat32()),
                                            a & n.w6.FACING && (i.realFacing = t.getFloat32()),
                                            a & n.w6.FLAGS) {
                                                const e = t.getUint8();
                                                i.hit = e & n.so.HIT,
                                                i.attack = (e & n.so.ATTACK) === n.so.ATTACK,
                                                i.defend = (e & n.so.DEFEND) === n.so.DEFEND,
                                                i.poisoned = (e & n.so.POISON) === n.so.POISON,
                                                e & n.so.TDM && (i.team = t.getUint8()),
                                                e & n.so.WEARABLES && (i.wearing = t.getUint8())
                                            }
                                            a & n.w6.HEALTH && (i.realHealthRatio = t.getUint8() / 255,
                                            i.realShieldRatio = t.getUint8() / 255),
                                            a & n.w6.DISPLAY && (i.name = t.getStringUTF8(),
                                            i.nameColor = t.getStringUTF8(),
                                            i.rarity = t.getUint8(),
                                            i.level = t.getUint16())
                                        } else
                                            A.players.delete(e);
                                    else {
                                        i.name = t.getStringUTF8(),
                                        i.nameColor = t.getStringUTF8(),
                                        i.rarity = t.getUint8(),
                                        i.level = t.getUint16(),
                                        i.realX = t.getFloat32(),
                                        i.realY = t.getFloat32(),
                                        i.realSize = t.getFloat32(),
                                        i.realFacing = t.getFloat32();
                                        const e = t.getUint8();
                                        i.hit = e & n.so.HIT,
                                        i.attack = (e & n.so.ATTACK) === n.so.ATTACK,
                                        i.defend = (e & n.so.DEFEND) === n.so.DEFEND,
                                        i.poisoned = (e & n.so.POISON) === n.so.POISON,
                                        e & n.so.TDM && (i.team = t.getUint8()),
                                        e & n.so.WEARABLES && (i.wearing = t.getUint8()),
                                        i.realHealthRatio = t.getUint8() / 255,
                                        i.healthRatio = i.realHealthRatio,
                                        i.realShieldRatio = t.getUint8() / 255,
                                        i.shieldRatio = i.realShieldRatio,
                                        i.x = i.realX,
                                        i.y = i.realY,
                                        i.size = i.realSize,
                                        i.facing = i.realFacing
                                    }
                                }
                                for (; e = t.getUint32(),
                                e > 0; ) {
                                    const a = t.getUint8();
                                    let i = A.petals.get(e);
                                    if (i || (i = new v(e),
                                    A.petals.set(e, i)),
                                    a !== n.w6.NEW)
                                        if (a !== n.w6.DIE) {
                                            if (a & n.w6.POSITION && (i.realX = t.getFloat32(),
                                            i.realY = t.getFloat32()),
                                            a & n.w6.SIZE && (i.realSize = t.getFloat32()),
                                            a & n.w6.FACING && (i.realFacing = t.getFloat32()),
                                            a & n.w6.FLAGS) {
                                                const e = t.getUint8();
                                                i.hit = e & n.so.HIT
                                            }
                                        } else
                                            A.petals.delete(e);
                                    else {
                                        i.index = t.getUint8(),
                                        i.realX = t.getFloat32(),
                                        i.realY = t.getFloat32(),
                                        i.realSize = t.getFloat32(),
                                        i.realFacing = t.getFloat32();
                                        const e = t.getUint8();
                                        i.hit = e & n.so.HIT,
                                        i.x = i.realX,
                                        i.y = i.realY,
                                        i.size = i.realSize,
                                        i.facing = i.realFacing
                                    }
                                }
                                for (; e = t.getUint32(),
                                e > 0; ) {
                                    const a = t.getUint8();
                                    let i = A.mobs.get(e);
                                    if (i || (i = new P(e),
                                    A.mobs.set(e, i)),
                                    a !== n.w6.NEW)
                                        if (a !== n.w6.DIE) {
                                            if (a & n.w6.POSITION && (i.realX = t.getFloat32(),
                                            i.realY = t.getFloat32()),
                                            a & n.w6.SIZE && (i.realSize = t.getFloat32()),
                                            a & n.w6.FACING && (i.realFacing = t.getFloat32()),
                                            a & n.w6.FLAGS) {
                                                const e = t.getUint8();
                                                i.hit = e & n.so.HIT,
                                                i.attack = (e & n.so.ATTACK) === n.so.ATTACK,
                                                i.poisoned = (e & n.so.POISON) === n.so.POISON,
                                                i.friendly = (e & n.so.FRIEND) === n.so.FRIEND
                                            }
                                            if (a & n.w6.HEALTH && (i.realHealthRatio = t.getUint8() / 255),
                                            a & n.w6.ROPE_BODIES) {
                                                const e = t.getUint8();
                                                if (e !== i.extraData.length) {
                                                    i.extraData = [];
                                                    for (let a = 0; a < e; a++)
                                                        i.extraData.push({
                                                            x: t.getFloat32(),
                                                            y: t.getFloat32()
                                                        }),
                                                        i.extraData[a].realX = i.extraData[a].x,
                                                        i.extraData[a].realY = i.extraData[a].y
                                                } else
                                                    for (let a = 0; a < e; a++)
                                                        i.extraData[a].realX = t.getFloat32(),
                                                        i.extraData[a].realY = t.getFloat32()
                                            }
                                        } else
                                            A.mobs.delete(e);
                                    else {
                                        i.index = t.getUint8(),
                                        i.rarity = t.getUint8(),
                                        i.realX = t.getFloat32(),
                                        i.realY = t.getFloat32(),
                                        i.realSize = t.getFloat32(),
                                        i.realFacing = t.getFloat32();
                                        const e = t.getUint8();
                                        switch (i.hit = (e & n.so.HIT) === n.so.HIT,
                                        i.attack = (e & n.so.ATTACK) === n.so.ATTACK,
                                        i.poisoned = (e & n.so.POISON) === n.so.POISON,
                                        i.friendly = (e & n.so.FRIEND) === n.so.FRIEND,
                                        i.realHealthRatio = t.getUint8() / 255,
                                        i.healthRatio = i.realHealthRatio,
                                        i.x = i.realX,
                                        i.y = i.realY,
                                        i.size = i.realSize,
                                        i.facing = i.realFacing,
                                        A.mobConfigs[i.index].name) {
                                        case "Starfish":
                                            i.extraData = new s.zM;
                                            break;
                                        case "Leech":
                                            i.extraData = [{
                                                x: 0,
                                                y: 0,
                                                realX: 0,
                                                realY: 0
                                            }]
                                        }
                                    }
                                }
                                for (; e = t.getUint32(),
                                e > 0; )
                                    A.drops.set(e, {
                                        id: e,
                                        x: t.getFloat32(),
                                        y: t.getFloat32(),
                                        size: t.getFloat32(),
                                        index: t.getUint8(),
                                        rarity: t.getUint8()
                                    });
                                for (; e = t.getUint32(),
                                e > 0; )
                                    A.drops.delete(e);
                                for (; e = t.getUint32(),
                                e > 0; ) {
                                    const a = t.getUint8();
                                    let i = A.markers.get(e);
                                    i || (i = new j(e),
                                    A.markers.set(e, i)),
                                    a !== n.w6.NEW ? a !== n.w6.DIE || A.markers.delete(e) : (i.x = t.getFloat32(),
                                    i.y = t.getFloat32(),
                                    i.size = t.getFloat32(),
                                    i.creation = +t.getStringUTF8(),
                                    i.timer = t.getUint32())
                                }
                                for (; e = t.getUint32(),
                                e > 0; ) {
                                    const a = new C(e)
                                      , i = t.getUint16();
                                    for (let e = 0; e < i; e++)
                                        a.points.push({
                                            x: t.getFloat32(),
                                            y: t.getFloat32()
                                        });
                                    a.improvePoints(),
                                    A.lightning.set(e, a)
                                }
                                {
                                    const e = t.getUint8();
                                    e !== A.slots.length && (A.slots = []);
                                    for (let a = 0; a < e; a++)
                                        A.slots[a] ??= {
                                            ratio: 1
                                        },
                                        A.slots[a].index = t.getUint8(),
                                        A.slots[a].rarity = t.getUint8(),
                                        A.slots[a].realRatio = t.getFloat32()
                                }
                                {
                                    const e = t.getUint8();
                                    e !== A.secondarySlots.length && (A.secondarySlots = []);
                                    for (let a = 0; a < e; a++) {
                                        1 === t.getUint8() ? (A.secondarySlots[a] ??= {},
                                        A.secondarySlots[a].index = t.getUint8(),
                                        A.secondarySlots[a].rarity = t.getUint8()) : (A.secondarySlots[a] ??= {},
                                        A.secondarySlots[a].index = -1)
                                    }
                                }
                                1 === t.getUint8() ? A.waveInfo = {
                                    wave: t.getUint16(),
                                    livingMobs: t.getUint16(),
                                    maxMobs: t.getUint16()
                                } : A.waveInfo = null,
                                A.level = t.getUint16(),
                                A.levelProgressTarget = t.getFloat32();
                                break;
                            case n.de.ROOM_UPDATE:
                                A.room.width = t.getFloat32(),
                                A.room.height = t.getFloat32(),
                                A.room.isRadial = 1 === t.getUint8(),
                                A.room.biome = t.getUint8();
                                break;
                            case n.de.DEATH:
                                A.isDead = !0,
                                A.killMessage = t.getStringUTF8();
                                break;
                            case n.de.UPDATE_ASSETS:
                                console.warn("Server is asking us to update assets"),
                                I(this.lobbyID);
                                break;
                            case n.de.JSON_MESSAGE:
                                console.log(JSON.parse(t.getStringUTF8()));
                                break;
                            case n.de.PONG:
                                A.ping = performance.now() - this.pingStart,
                                setTimeout(( () => this.ping()), 1e3);
                                break;
                            case n.de.TERRAIN:
                                A.terrain = {
                                    width: t.getUint16(),
                                    height: t.getUint16(),
                                    blocks: ( (e=[]) => {
                                        for (let a = t.getUint16(); a > 0; a--)
                                            e.push({
                                                x: t.getInt16(),
                                                y: t.getInt16(),
                                                type: [t.getUint8(), t.getUint8()],
                                                terrain: []
                                            }),
                                            e[e.length - 1].terrain = n.$W[e[e.length - 1].type[0]][e[e.length - 1].type[1]];
                                        return e
                                    }
                                    )()
                                },
                                A.terrainImg = (0,
                                o.Uo)(.5 * A.room.width, .5 * A.room.height, A.terrain.width, A.terrain.blocks),
                                A.minimapImg = (0,
                                o.Tv)(A.terrain.width, A.terrain.blocks);
                                break;
                            case n.de.CHAT_MESSAGE:
                                switch (t.getUint8()) {
                                case 0:
                                    new M(0,t.getStringUTF8(),t.getStringUTF8(),t.getStringUTF8());
                                    break;
                                case 1:
                                    new M(1,t.getStringUTF8(),t.getStringUTF8())
                                }
                            }
                        }
                        ping() {
                            this.pingStart = performance.now(),
                            this.talk(n.fh.PING)
                        }
                        verify(e) {
                            this.talk(n.fh.VERIFY, e)
                        }
                        spawn() {
                            this.talk(n.fh.SPAWN)
                        }
                        talk(e, t) {
                            if (this.readyState !== WebSocket.OPEN)
                                return;
                            const a = new n.AU(!0);
                            switch (a.setUint8(e),
                            e) {
                            case n.fh.VERIFY:
                                a.setStringUTF8(t);
                                break;
                            case n.fh.SPAWN:
                                break;
                            case n.fh.INPUTS:
                                if (a.setUint8(t),
                                r.fF.mouseMovement) {
                                    const e = L.x - o.Ji.width / 2
                                      , t = L.y - o.Ji.height / 2
                                      , i = Math.atan2(t, e)
                                      , n = r.t1({
                                        x: 0,
                                        y: 0
                                    }, {
                                        x: e,
                                        y: t
                                    });
                                    a.setFloat32(i),
                                    a.setFloat32(n / o.Ji.width / 2)
                                }
                                break;
                            case n.fh.CHANGE_LOADOUT:
                                {
                                    const {drag: e, drop: i} = t;
                                    a.setUint8(e.type),
                                    a.setUint8(e.index),
                                    a.setUint8(i.type),
                                    a.setUint8(i.index)
                                }
                                break;
                            case n.fh.DEV_CHEAT:
                                {
                                    const e = Number.isInteger(t) ? t : t.id;
                                    switch (a.setUint8(e),
                                    e) {
                                    case n.F6.TELEPORT:
                                        const e = (0,
                                        o.De)(A.camera.fov);
                                        a.setFloat32((L.x - o.Ji.width / 2) / e),
                                        a.setFloat32((L.y - o.Ji.height / 2) / e);
                                        break;
                                    case n.F6.CHANGE_TEAM:
                                        let i = 0
                                          , s = (0,
                                        o.De)(A.camera.fov)
                                          , r = A.camera.x + (L.x - o.Ji.width / 2) / s
                                          , l = A.camera.y + (L.y - o.Ji.height / 2) / s;
                                        for (const e of A.mobs.values()) {
                                            let t = e.x - r
                                              , a = e.y - l;
                                            if (Math.sqrt(t * t + a * a) < e.size) {
                                                i = e.id;
                                                break
                                            }
                                        }
                                        for (const e of A.players.values()) {
                                            let t = e.x - r
                                              , a = e.y - l;
                                            if (Math.sqrt(t * t + a * a) < e.size) {
                                                i = e.id;
                                                break
                                            }
                                        }
                                        a.setUint32(i);
                                        break;
                                    case n.F6.SPAWN_MOB:
                                        a.setUint8(t.index),
                                        a.setUint8(t.rarity);
                                        break;
                                    case n.F6.SET_PETAL:
                                        a.setUint32(t.clientID),
                                        a.setUint8(t.slotID),
                                        a.setUint8(t.index),
                                        a.setUint8(t.rarity);
                                        break;
                                    case n.F6.SET_XP:
                                        a.setUint32(t.clientID),
                                        a.setUint32(t.xp)
                                    }
                                }
                                break;
                            case n.fh.CHAT_MESSAGE:
                                a.setStringUTF8(t)
                            }
                            const i = a.build();
                            this._dataOut += i.byteLength,
                            this.send(i)
                        }
                    }
                    class x {
                        x = 0;
                        y = 0;
                        size = 0;
                        realX = 0;
                        realY = 0;
                        realSize = 0;
                        interpolate() {
                            this.x = r.Cc(this.x, this.realX, .2),
                            this.y = r.Cc(this.y, this.realY, .2),
                            this.size = r.Cc(this.size, this.realSize, .2)
                        }
                    }
                    const A = {
                        interpolationFactor: .2,
                        username: "",
                        camera: {
                            x: 0,
                            y: 0,
                            fov: 512,
                            realX: 0,
                            realY: 0,
                            realFov: 1281,
                            interpolate: () => {
                                A.camera.x = r.Cc(A.camera.x, A.camera.realX, A.interpolationFactor),
                                A.camera.y = r.Cc(A.camera.y, A.camera.realY, A.interpolationFactor),
                                A.camera.fov = r.Cc(A.camera.fov, A.camera.realFov, A.interpolationFactor)
                            }
                        },
                        room: {
                            width: 100,
                            height: 100,
                            isRadial: !1,
                            biome: 0
                        },
                        playerID: 0,
                        players: new Map,
                        petals: new Map,
                        mobs: new Map,
                        drops: new Map,
                        markers: new Map,
                        lightning: new Map,
                        socket: null,
                        tiers: [],
                        petalConfigs: [],
                        mobConfigs: [],
                        disconnected: !1,
                        disconnectMessage: "Connection lost",
                        isDead: !1,
                        killMessage: "",
                        slots: [],
                        secondarySlots: [],
                        destroyIcon: new x,
                        petalHover: null,
                        waveInfo: null,
                        level: 1,
                        levelProgress: 0,
                        levelProgressTarget: 0,
                        isInDestroy: !1,
                        updatesCounter: 0,
                        updateRate: 0,
                        ping: 0,
                        lastPingTime: 0,
                        terrain: null,
                        terrainImg: null,
                        minimapImg: null
                    }
                      , E = new Set
                      , L = {
                        x: 0,
                        y: 0,
                        left: !1,
                        right: !1
                    };
                    async function I(e) {
                        const t = await fetch(`${r.UB}/lobby/resources?partyURL=${e}`)
                          , a = await t.text();
                        if ("null" === a)
                            return !1;
                        const i = (0,
                        n.OD)(JSON.parse(a));
                        return location.hash = e,
                        A.tiers = i.tiers,
                        A.petalConfigs = i.petalConfigs,
                        A.mobConfigs = i.mobConfigs,
                        await (0,
                        n.dX)(),
                        !0
                    }
                    let D = !1;
                    async function q(e, t, a=r.UB.replace("http", "ws")) {
                        if (!D) {
                            D = !0,
                            A.username = t;
                            try {
                                if (!await I(e))
                                    return alert("Failed to load assets"),
                                    void (D = !1);
                                location.hash = e,
                                A.socket = new S(`${a}/ws/client?partyURL=${e}&clientKey=${localStorage.getItem("token") ?? ""}&uuid=${b}&analytics=${m}`,t),
                                A.socket.lobbyID = e
                            } catch (e) {
                                console.error(e),
                                alert("Couldn't connect"),
                                D = !1
                            }
                        }
                    }
                    i()
                } catch (R) {
                    i(R)
                }
            }
            ), 1)
        }
        ,
        110: (e, t, a) => {
            a.d(t, {
                $W: () => v,
                AU: () => p,
                DQ: () => f,
                F6: () => d,
                H1: () => b,
                OD: () => y,
                VC: () => m,
                XE: () => l,
                dX: () => P,
                de: () => c,
                fh: () => h,
                hg: () => T,
                lm: () => s,
                mP: () => k,
                so: () => g,
                w6: () => u,
                z: () => o
            });
            const i = [{
                name: "Common",
                color: "#7EEF6D"
            }, {
                name: "Uncommon",
                color: "#FFE65D"
            }, {
                name: "Rare",
                color: "#455FCF"
            }, {
                name: "Epic",
                color: "#7633CB"
            }, {
                name: "Legendary",
                color: "#C13328"
            }, {
                name: "Mythic",
                color: "#1ED2CB"
            }, {
                name: "Ultra",
                color: "#ff2b75"
            }, {
                name: "Super",
                color: "#2affa3"
            }, {
                name: "Ancient",
                color: "#ff7b29"
            }, {
                name: "Omega",
                color: "#d966e8"
            }, {
                name: "???",
                color: "#333333"
            }, {
                name: "Unique",
                color: "#FFFFFF"
            }];
            class o {
                static HEALTH_SCALE = 3;
                static DAMAGE_SCALE = 3;
                constructor(e, t, a) {
                    this.health = t * Math.pow(o.HEALTH_SCALE, e),
                    this.damage = a * Math.pow(o.DAMAGE_SCALE, e),
                    this.extraHealth = 0,
                    this.constantHeal = 0,
                    this.healing = 0,
                    this.count = 1,
                    this.clumps = !1,
                    this.damageReduction = 0,
                    this.damageReflection = 0,
                    this.speedMultiplier = 1,
                    this.extraSize = 0,
                    this.extraRange = 0,
                    this.poison = null,
                    this.spawnable = null,
                    this.pentagramAbility = null,
                    this.lightning = null,
                    this.extraVision = 0,
                    this.extraPickupRange = 0,
                    this.density = 1,
                    this.deathDefying = 0,
                    this.absorbsDamage = null,
                    this.shield = 0,
                    this.boost = null,
                    this.healBack = 0
                }
            }
            class n {
                static HEALTH_SCALE = 3.1;
                static DAMAGE_SCALE = 3;
                static SIZE_SCALE = 1.3;
                constructor(e, t, a, i) {
                    this.health = t * Math.pow(n.HEALTH_SCALE, e),
                    this.damage = a * Math.pow(n.DAMAGE_SCALE, e),
                    this.size = i * Math.pow(n.SIZE_SCALE, e),
                    this.damageReduction = 0,
                    this.projectile = null,
                    this.poison = null,
                    this.lightning = null,
                    this.antHoleSpawns = null
                }
            }
            class s {
                static idAccumulator = 0;
                #n() {
                    const e = [];
                    for (let t = 0; t < i.length; t++)
                        e.push(new o(t,this.health,this.damage));
                    return e
                }
                constructor(e, t, a, i) {
                    this.id = s.idAccumulator++,
                    this.name = e,
                    this.cooldown = t,
                    this.health = a,
                    this.damage = i,
                    this.sizeRatio = 1,
                    this.extraRadians = 0,
                    this.launchable = !1,
                    this.launchedSpeed = 0,
                    this.launchedRange = 0,
                    this.wingMovement = !1,
                    this.yinYangMovement = !1,
                    this.wearable = !1,
                    this.enemySpeedDebuff = null,
                    this.splits = null,
                    this.tiers = this.#n(),
                    this.attractsLightning = !1,
                    this.drawing = null,
                    this.shootsOut = -1,
                    this.healsInDefense = !1,
                    this.phases = !1,
                    this.canPlaceDown = !1,
                    this.healWhenUnder = 1,
                    this.huddles = !1,
                    this.description = "Not much is known about this mysterious petal."
                }
                setName(e) {
                    return this.name = e,
                    this
                }
                setHuddles(e) {
                    return this.huddles = Boolean(e),
                    this
                }
                setCooldown(e) {
                    return this.cooldown = e,
                    this
                }
                setHealth(e) {
                    this.health = e;
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].health = e * Math.pow(o.HEALTH_SCALE, t);
                    return this
                }
                setDamage(e) {
                    this.damage = e;
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].damage = e * Math.pow(o.DAMAGE_SCALE, t);
                    return this
                }
                setSize(e) {
                    return this.sizeRatio = e,
                    this
                }
                setMulti(e, t) {
                    for (let a = 0; a < this.tiers.length; a++)
                        this.tiers[a].count = e instanceof Array ? e[a] ?? e[e.length - 1] : e,
                        this.tiers[a].clumps = Boolean(t);
                    return this
                }
                setDrawing(e) {
                    if (!(e instanceof b))
                        throw new Error("Invalid drawing type");
                    return this.drawing = e,
                    this
                }
                setExtraRadians(e) {
                    return this.extraRadians = e,
                    this
                }
                setExtraHealth(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].extraHealth = e * Math.pow(o.HEALTH_SCALE, t);
                    return this
                }
                setConstantHeal(e, t=!1, a=1) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].constantHeal = e / 22.5 * Math.pow(o.HEALTH_SCALE, t);
                    return this.healsInDefense = t,
                    this.healWhenUnder = a,
                    this
                }
                setWingMovement(e) {
                    return this.wingMovement = e,
                    this
                }
                setDamageReduction(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].damageReduction = e * Math.pow(1.1, t);
                    return this
                }
                setSpeedMultiplier(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].speedMultiplier = Math.pow(e, 1 + t / 2.25);
                    return this
                }
                setExtraSize(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].extraSize = e + Math.pow(1.5, t);
                    return this
                }
                setDescription(e) {
                    return this.description = e,
                    this
                }
                setLaunchable(e, t) {
                    return this.launchable = !0,
                    this.launchedSpeed = e,
                    this.launchedRange = t,
                    this
                }
                setHealing(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].healing = e * Math.pow(o.HEALTH_SCALE, t);
                    return this
                }
                setYinYang(e) {
                    return this.yinYangMovement = e,
                    this
                }
                setEnemySpeedMultiplier(e, t) {
                    return this.enemySpeedDebuff = {
                        speedMultiplier: e,
                        duration: 22.5 * t
                    },
                    this
                }
                setPoison(e, t) {
                    for (let a = 0; a < this.tiers.length; a++)
                        this.tiers[a].poison = {
                            damage: e / 22.5 * Math.pow(o.DAMAGE_SCALE, a),
                            duration: 22.5 * t
                        };
                    return this
                }
                setShootOut(e) {
                    return this.shootsOut = e,
                    this
                }
                setExtraRange(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].extraRange = e * Math.pow(1.15, t);
                    return this
                }
                setWearable(e) {
                    return this.wearable = e,
                    this
                }
                setSpawnable(e, t, a) {
                    for (let i = 0; i < this.tiers.length; i++)
                        this.tiers[i].spawnable = {
                            index: e,
                            rarity: t instanceof Array ? t[i] ?? t[t.length - 1] : t,
                            timer: 22.5 * a
                        };
                    return this
                }
                setExtraVision(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].extraVision = e * Math.pow(1.5, t);
                    return this
                }
                setSplits(e, t) {
                    return this.splits = {
                        index: e,
                        count: t
                    },
                    this
                }
                setHealSpit(e, t, a) {
                    return this.healSpit = {
                        cooldown: e,
                        range: t,
                        heal: a
                    },
                    this
                }
                setPentagramAbility(e, t, a, i, n) {
                    for (let s = 0; s < this.tiers.length; s++)
                        this.tiers[s].pentagramAbility = {
                            cooldown: e,
                            range: t * Math.pow(1.15, s),
                            damage: a * Math.pow(o.DAMAGE_SCALE, s),
                            poison: {
                                damage: i.damage / 22.5 * Math.pow(o.DAMAGE_SCALE, s),
                                duration: 22.5 * i.duration * Math.pow(1.1, s)
                            },
                            speedDebuff: {
                                multiplier: n.multiplier,
                                duration: 22.5 * n.duration * Math.pow(1.1, s)
                            }
                        };
                    return this
                }
                setLightning(e, t, a, i=1, n=!1) {
                    for (let s = 0; s < this.tiers.length; s++)
                        this.tiers[s].lightning = {
                            bounces: e instanceof Array ? e[s] ?? e[e.length - 1] : e,
                            range: t * Math.pow(1.15, s),
                            damage: a * Math.pow(o.DAMAGE_SCALE, s),
                            charges: i instanceof Array ? i[s] ?? i[i.length - 1] : i,
                            lightningOnParentHit: n
                        };
                    return this
                }
                setExtraPickupRange(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].extraPickupRange = e * Math.pow(1.35, t);
                    return this
                }
                setDamageReflection(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].damageReflection = e * Math.pow(4 / 3, t);
                    return this
                }
                setAttractsLightning(e) {
                    return this.attractsLightning = e,
                    this
                }
                setDensity(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].density = e * Math.pow(1.25, t);
                    return this
                }
                setDeathDefying(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].deathDefying = e * Math.pow(1.1883, t);
                    return this
                }
                setPhases(e) {
                    return this.phases = Boolean(e),
                    this
                }
                setAbsorbsDamage(e, t) {
                    for (let a = 0; a < this.tiers.length; a++)
                        this.tiers[a].absorbsDamage = {
                            maxDamage: e instanceof Array ? e[a] ?? e[e.length - 1] : e * Math.pow(o.DAMAGE_SCALE, a),
                            period: t instanceof Array ? t[a] ?? t[t.length - 1] : t
                        };
                    return this
                }
                setPlaceDown(e) {
                    return this.canPlaceDown = Boolean(e),
                    this
                }
                setShield(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].shield = e instanceof Array ? e[t] ?? e[e.length - 1] : e * Math.pow(o.HEALTH_SCALE, t);
                    return this
                }
                setBoost(e, t) {
                    for (let a = 0; a < this.tiers.length; a++)
                        this.tiers[a].boost = {
                            length: e instanceof Array ? e[a] ?? e[e.length - 1] : e,
                            delay: t instanceof Array ? t[a] ?? t[t.length - 1] : t
                        };
                    return this
                }
                setHealBack(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].healBack = e instanceof Array ? e[t] ?? e[e.length - 1] : e;
                    return this
                }
                setAttractsAggro(e) {
                    return this.attractsAggro = Boolean(e),
                    this
                }
            }
            class r {
                index = 0;
                minRarity = 0;
                chance = 1
            }
            class l {
                static idAccumulator = 0;
                #n() {
                    const e = [];
                    for (let t = 0; t < i.length; t++)
                        e.push(new n(t,this.health,this.damage,this.size));
                    return e
                }
                constructor(e, t, a, i, o) {
                    this.id = l.idAccumulator++,
                    this.name = e,
                    this.health = t,
                    this.damage = a,
                    this.size = i,
                    this.speed = o,
                    this.aggressive = !1,
                    this.neutral = !1,
                    this.spawnable = !0,
                    this.sandstormMovement = !1,
                    this.damageReflection = 0,
                    this.tiers = this.#n(),
                    this.drops = [],
                    this.drawing = null,
                    this.hatchables = null,
                    this.poopable = null,
                    this.isSystem = !1,
                    this.movesInBursts = !1,
                    this.moveInSines = !1
                }
                setSystem(e) {
                    return this.isSystem = Boolean(e),
                    this
                }
                setMovesInBursts(e) {
                    return this.movesInBursts = Boolean(e),
                    this
                }
                setAggressive(e) {
                    return this.aggressive = Boolean(e),
                    this
                }
                setNeutral(e) {
                    return this.neutral = Boolean(e),
                    this
                }
                setSandstormMovement(e) {
                    return this.sandstormMovement = Boolean(e),
                    this
                }
                setDamageReduction(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].damageReduction = e * Math.pow(1.1, t);
                    return this
                }
                setDamageReflection(e) {
                    return this.damageReflection = e,
                    this
                }
                setProjectile(e={}) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].projectile = {
                            petalIndex: e.petalIndex ?? 0,
                            cooldown: e.cooldown ?? 10,
                            health: (e.health ?? 1) * Math.pow(n.HEALTH_SCALE, t),
                            damage: (e.damage ?? 1) * Math.pow(n.DAMAGE_SCALE, t),
                            speed: e.speed ?? 5,
                            range: (e.range ?? 50) * Math.pow(.8 * n.SIZE_SCALE, t),
                            size: e.size ?? .35,
                            multiShot: e.multiShot ?? null
                        };
                    return this
                }
                addDrop(e, t=1, a=0) {
                    if (e < 0 || e > 255)
                        throw new Error("Invalid drop index");
                    const i = new r;
                    return i.index = e,
                    i.minRarity = a,
                    i.chance = t,
                    this.drops.push(i),
                    this
                }
                setPoison(e, t) {
                    for (let a = 0; a < this.tiers.length; a++)
                        this.tiers[a].poison = {
                            damage: e / 22.5 * Math.pow(o.DAMAGE_SCALE, a),
                            duration: 22.5 * t
                        };
                    return this
                }
                setLightning(e, t, a, i) {
                    for (let n = 0; n < this.tiers.length; n++)
                        this.tiers[n].lightning = {
                            cooldown: e instanceof Array ? e[n] ?? e[e.length - 1] : e,
                            bounces: t instanceof Array ? t[n] ?? t[t.length - 1] : t,
                            range: a * Math.pow(1.15, n),
                            damage: i * Math.pow(o.DAMAGE_SCALE, n)
                        };
                    return this
                }
                setSize(e, t=n.SIZE_SCALE) {
                    this.size = e;
                    for (let a = 0; a < this.tiers.length; a++)
                        this.tiers[a].size = e * Math.pow(t, a);
                    return this
                }
                setAntHoleSpawns(e) {
                    for (let t = 0; t < this.tiers.length; t++)
                        this.tiers[t].antHoleSpawns = e.map(( ({index: e, count: a, minHealthRatio: i}) => ({
                            index: e,
                            count: a instanceof Array ? a[t] ?? a[a.length - 1] : a,
                            minHealthRatio: i ?? 1
                        })));
                    return this
                }
                setHatchables(e) {
                    if (e instanceof Array) {
                        for (let t = 0; t < e.length; t++)
                            if (e[t].index < 0 || e[t].index > 255)
                                throw new Error("Invalid hatchable index");
                        this.hatchables = e
                    } else {
                        if (e.index < 0 || e.index > 255)
                            throw new Error("Invalid hatchable index");
                        this.hatchables = [e]
                    }
                    return this
                }
                setPoopable(e) {
                    if (e.index < 0 || e.index > 255)
                        throw new Error("Invalid poopable index");
                    return this.poopable = e,
                    this
                }
                segmentWith(e) {
                    return this.segment = e,
                    this
                }
                setMoveInSines(e) {
                    return this.moveInSines = Boolean(e),
                    this
                }
            }
            const c = {
                KICK: 0,
                READY: 1,
                MESSAGE: 2,
                WORLD_UPDATE: 3,
                DEATH: 4,
                ROOM_UPDATE: 5,
                UPDATE_ASSETS: 6,
                JSON_MESSAGE: 7,
                PONG: 8,
                TERRAIN: 9,
                CHAT_MESSAGE: 10
            }
              , h = {
                VERIFY: 0,
                SPAWN: 1,
                INPUTS: 2,
                CHANGE_LOADOUT: 3,
                DEV_CHEAT: 4,
                PING: 5,
                CHAT_MESSAGE: 6
            }
              , d = {
                TELEPORT: 0,
                GODMODE: 1,
                CHANGE_TEAM: 2,
                SPAWN_MOB: 3,
                SET_PETAL: 4,
                SET_XP: 5,
                INFO_DUMP: 6
            }
              , u = {
                NEW: 0,
                DIE: 1,
                POSITION: 2,
                SIZE: 4,
                FACING: 8,
                FLAGS: 16,
                HEALTH: 32,
                DISPLAY: 64,
                ROPE_BODIES: 128
            }
              , g = {
                HIT: 1,
                POISON: 2,
                ATTACK: 4,
                DEFEND: 8,
                TDM: 16,
                FRIEND: 32,
                WEARABLES: 64
            }
              , f = {
                ANTENNAE: 1,
                THIRD_EYE: 2,
                CUTTER: 4,
                AMULET: 8,
                AIR: 16
            }
              , m = {
                DEFAULT: 0,
                GARDEN: 1,
                DESERT: 2,
                OCEAN: 3,
                ANT_HELL: 4,
                HELL: 5,
                SEWERS: 6
            }
              , T = {
                [m.DEFAULT]: {
                    name: "Default",
                    color: "#1EA660",
                    tile: "tiles/garden.svg"
                },
                [m.GARDEN]: {
                    name: "Garden",
                    color: "#1EA660",
                    tile: "tiles/garden.svg"
                },
                [m.DESERT]: {
                    name: "Desert",
                    color: "#ECDCB8",
                    tile: "tiles/desert.svg"
                },
                [m.OCEAN]: {
                    name: "Ocean",
                    color: "#6D96BE",
                    tile: "tiles/ocean.svg",
                    alt: "tiles/oceanAlt.svg"
                },
                [m.ANT_HELL]: {
                    name: "Ant Hell",
                    color: "#8E603F",
                    tile: "tiles/antHell.svg"
                },
                [m.HELL]: {
                    name: "Hell",
                    color: "#973332",
                    tile: "tiles/hell.svg"
                },
                [m.SEWERS]: {
                    name: "Sewers",
                    color: "#676733",
                    tile: "tiles/sewer.svg"
                }
            };
            class b {
                static actions = {
                    circle: [0, "x", "y", "radius"],
                    rect: [1, "x", "y", "width", "height"],
                    text: [2, "x", "y", "size", "text"],
                    line: [3, "x1", "y1", "x2", "y2"],
                    arc: [4, "x", "y", "radius", "startAngle", "endAngle"],
                    beginPath: [5],
                    closePath: [6],
                    moveTo: [7, "x", "y"],
                    lineTo: [8, "x", "y"],
                    stroke: [9, "color", "lineWidth"],
                    fill: [10, "color"],
                    paint: [11, "color", "lineWidth"],
                    polygon: [12, "sides", "radius", "rotation"],
                    spikeBall: [13, "sides", "radius", "rotation"],
                    dipPolygon: [14, "sides", "radius", "dipMult"],
                    opacity: [15, "opacity"],
                    blur: [16, "color", "strength"],
                    noBlur: [17]
                };
                static reverseActions = Object.fromEntries(Object.keys(b.actions).map((e => [b.actions[e][0], e])));
                static fromString(e) {
                    const t = new b;
                    return t.actions = e.split(";").map((e => {
                        const [t,...a] = e.split(",").map((e => {
                            if ("" !== e)
                                return "#" === e[0] ? e : parseFloat(e)
                        }
                        ));
                        return [t, ...a]
                    }
                    )),
                    t
                }
                constructor() {
                    this.actions = []
                }
                addAction(e, ...t) {
                    const a = b.actions[e];
                    if (!a)
                        throw new Error(`Unknown action: ${e}`);
                    if (t.length !== a.length - 1)
                        throw new Error(`Invalid number of arguments for action ${e}, please provide ${a.slice(1).join(", ")}`);
                    return this.actions.push([a[0], ...t]),
                    this
                }
                getActions(e) {
                    return this.actions.filter((t => t[0] === b.actions[e][0]))
                }
                toString() {
                    return this.actions.map((e => e.join(","))).join(";")
                }
            }
            class k {
                constructor(e, t, a) {
                    this.reader = !0,
                    this._e = a,
                    e && this.repurpose(e, t)
                }
                repurpose(e, t) {
                    this.view = e,
                    this._o = t || 0
                }
                getUint8() {
                    return this.view.getUint8(this._o++, this._e)
                }
                getInt8() {
                    return this.view.getInt8(this._o++, this._e)
                }
                getUint16() {
                    return this.view.getUint16((this._o += 2) - 2, this._e)
                }
                getInt16() {
                    return this.view.getInt16((this._o += 2) - 2, this._e)
                }
                getUint32() {
                    return this.view.getUint32((this._o += 4) - 4, this._e)
                }
                getInt32() {
                    return this.view.getInt32((this._o += 4) - 4, this._e)
                }
                getFloat32() {
                    return this.view.getFloat32((this._o += 4) - 4, this._e)
                }
                getFloat64() {
                    return this.view.getFloat64((this._o += 8) - 8, this._e)
                }
                getStringUTF8() {
                    let e, t = "";
                    for (; 0 !== (e = this.view.getUint8(this._o++)); )
                        t += String.fromCharCode(e);
                    return decodeURIComponent(escape(t))
                }
            }
            class p {
                constructor(e) {
                    return this.writer = !0,
                    this.tmpBuf = new DataView(new ArrayBuffer(8)),
                    this._e = e,
                    this.reset(),
                    this
                }
                reset(e=this._e) {
                    this._e = e,
                    this._b = [],
                    this._o = 0
                }
                setUint8(e) {
                    return e >= 0 && e < 256 && this._b.push(e),
                    this
                }
                setInt8(e) {
                    return e >= -128 && e < 128 && this._b.push(e),
                    this
                }
                setUint16(e) {
                    return this.tmpBuf.setUint16(0, e, this._e),
                    this._move(2),
                    this
                }
                setInt16(e) {
                    return this.tmpBuf.setInt16(0, e, this._e),
                    this._move(2),
                    this
                }
                setUint32(e) {
                    return this.tmpBuf.setUint32(0, e, this._e),
                    this._move(4),
                    this
                }
                setInt32(e) {
                    return this.tmpBuf.setInt32(0, e, this._e),
                    this._move(4),
                    this
                }
                setFloat32(e) {
                    return this.tmpBuf.setFloat32(0, e, this._e),
                    this._move(4),
                    this
                }
                setFloat64(e) {
                    return this.tmpBuf.setFloat64(0, e, this._e),
                    this._move(8),
                    this
                }
                _move(e) {
                    for (let t = 0; t < e; t++)
                        this._b.push(this.tmpBuf.getUint8(t))
                }
                setStringUTF8(e) {
                    const t = unescape(encodeURIComponent(e));
                    for (let e = 0, a = t.length; e < a; e++)
                        this._b.push(t.charCodeAt(e));
                    return this._b.push(0),
                    this
                }
                build() {
                    return new Uint8Array(this._b)
                }
            }
            function F(e, t) {
                const a = {
                    id: e.shift(),
                    name: e.shift(),
                    description: e.shift(),
                    cooldown: e.shift(),
                    tiers: [],
                    extraRadians: 0,
                    drawing: void 0,
                    healWhenUnder: 1
                }
                  , i = e.shift();
                for (let o = 0; o < t; o++) {
                    const t = {
                        health: e.shift(),
                        damage: e.shift(),
                        extraHealth: 0,
                        constantHeal: 0,
                        healing: 0,
                        count: 1,
                        damageReduction: 0,
                        speedMultiplier: 1,
                        extraSize: 0,
                        density: 1,
                        deathDefying: 0
                    };
                    1 & i && (t.extraHealth = e.shift()),
                    2 & i && (t.constantHeal = e.shift()),
                    4 & i && (t.count = e.shift()),
                    8 & i && (t.damageReduction = e.shift()),
                    16 & i && (t.speedMultiplier = e.shift()),
                    32 & i && (t.extraSize = e.shift()),
                    64 & i && (t.healing = e.shift()),
                    1024 & i && (t.poison = {
                        damage: 22.5 * e.shift(),
                        duration: e.shift()
                    }),
                    2048 & i && (t.extraRange = e.shift()),
                    8192 & i && (t.spawnable = {
                        index: e.shift(),
                        rarity: e.shift(),
                        timer: e.shift() / 22.5
                    }),
                    16384 & i && (t.extraVision = e.shift()),
                    32768 & i && (t.pentagramAbility = {
                        cooldown: e.shift(),
                        range: e.shift(),
                        damage: e.shift(),
                        poison: {
                            damage: 22.5 * e.shift(),
                            duration: e.shift() / 22.5
                        },
                        speedDebuff: {
                            multiplier: e.shift(),
                            duration: e.shift() / 22.5
                        }
                    }),
                    65536 & i && (t.lightning = {
                        bounces: e.shift(),
                        range: e.shift(),
                        damage: e.shift(),
                        charges: e.shift()
                    }),
                    131072 & i && (t.extraPickupRange = e.shift()),
                    262144 & i && (t.healSpit = e.shift()),
                    524288 & i && (t.damageReflection = e.shift()),
                    1048576 & i && (t.density = e.shift()),
                    2097152 & i && (t.deathDefying = e.shift()),
                    4194304 & i && (t.absorbsDamage = {
                        maxDamage: e.shift(),
                        period: e.shift()
                    }),
                    8388608 & i && (t.shield = e.shift()),
                    16777216 & i && (t.boost = {
                        length: e.shift(),
                        delay: e.shift()
                    }),
                    67108864 & i && (t.healBack = e.shift()),
                    a.tiers.push(t)
                }
                return 128 & i && (a.extraRadians = e.shift()),
                256 & i && (a.drawing = b.fromString(e.shift())),
                512 & i && (a.enemySpeedDebuff = {
                    speedMultiplier: e.shift(),
                    duration: e.shift()
                }),
                4096 & i && (a.wearable = !0),
                33554432 & i && (a.healWhenUnder = e.shift()),
                a
            }
            function w(e) {
                return {
                    id: e.shift(),
                    name: e.shift(),
                    hideUI: 1 === e.shift()
                }
            }
            function y(e) {
                const t = []
                  , a = e.shift();
                for (let i = 0; i < a; i++)
                    t.push({
                        name: e.shift(),
                        color: e.shift()
                    });
                const i = function(e, t) {
                    const a = []
                      , i = e.shift();
                    for (let o = 0; o < i; o++)
                        a.push(F(e, t));
                    return a
                }(e, a)
                  , o = function(e) {
                    const t = []
                      , a = e.shift();
                    for (let i = 0; i < a; i++)
                        t.push(w(e));
                    return t
                }(e);
                return {
                    tiers: t,
                    petalConfigs: i,
                    mobConfigs: o
                }
            }
            const v = {};
            async function P() {
                const e = await fetch("/assets/terrains.json")
                  , t = await e.json();
                Object.assign(v, t)
            }
        }
        ,
        917: (e, t, a) => {
            a.a(e, (async (e, i) => {
                try {
                    a.d(t, {
                        GM: () => xe,
                        Ge: () => Yt,
                        Lt: () => je,
                        Zq: () => Q,
                        dG: () => ce,
                        eR: () => Vt,
                        lv: () => qe,
                        tl: () => Nt,
                        vT: () => G,
                        zM: () => At
                    });
                    var o = a(703)
                      , n = a(338)
                      , s = a(874)
                      , r = a(110)
                      , l = e([o]);
                    o = (l.then ? (await l)() : l)[0];
                    const c = 2 * Math.PI;
                    function h(e, t, a=.1) {
                        e.fillStyle = t,
                        e.strokeStyle = (0,
                        n.Lh)(t, "#000000", .2),
                        e.lineWidth = a
                    }
                    function d(e, t, a, i) {
                        const o = 1 - 7 / t / t * i;
                        e.beginPath(),
                        e.moveTo(a, 0);
                        for (let i = 0; i < t; i++) {
                            const n = (i + 1) / t * c
                              , s = (i + .5) / t * c;
                            e.quadraticCurveTo(Math.cos(s) * o * a, Math.sin(s) * o * a, Math.cos(n) * a, Math.sin(n) * a)
                        }
                        e.closePath()
                    }
                    function u(e, t, a, i) {
                        e.beginPath();
                        const o = c / t;
                        for (let n = 0; n < t; n++) {
                            const t = n * o;
                            e.lineTo(Math.cos(t + i) * a, Math.sin(t + i) * a)
                        }
                        e.closePath()
                    }
                    function g(e, t, a, i) {
                        e.beginPath();
                        const o = c / t;
                        for (let n = 0; n < t; n++) {
                            const t = n * o;
                            e.lineTo(Math.cos(t + i) * a, Math.sin(t + i) * a),
                            e.lineTo(Math.cos(t + i + o / 2) * a * .5, Math.sin(t + i + o / 2) * a * .5)
                        }
                        e.closePath()
                    }
                    function f(e) {
                        e.beginPath(),
                        e.lineTo(0, 0),
                        e.quadraticCurveTo(.7, -.16, .64, -.22),
                        e.quadraticCurveTo(.64, -.35, -.03, -.2),
                        e.closePath(),
                        e.fill()
                    }
                    function m(e=n.ej, t=!1, a=s.Tj.white) {
                        h(e, (0,
                        n.Lh)(a, "#FF0000", .5 * t), .225),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.fill(),
                        e.stroke()
                    }
                    const T = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 7, 7];
                    function b(e, t=n.ej, a=!1) {
                        const i = T[e];
                        if (h(t, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * a), i > 1 ? .15 : .2),
                        i > 1)
                            for (let e = i; e > 0; e--) {
                                const a = c / i * e;
                                t.beginPath(),
                                t.arc(.67 * Math.cos(a), .67 * Math.sin(a), .375, 0, c),
                                t.fill(),
                                t.stroke(),
                                t.closePath()
                            }
                        else
                            t.beginPath(),
                            t.arc(0, 0, .3, 0, c),
                            t.fill(),
                            t.stroke()
                    }
                    function k(e, t=n.ej) {
                        const a = T[e];
                        if (h(t, s.Tj.stingerBlack, a > 0 ? .1 : .2),
                        a > 1)
                            for (let e = a; e > 0; e--) {
                                const i = c / a * e
                                  , o = .5 * Math.cos(i)
                                  , n = .5 * Math.sin(i);
                                t.translate(o, n),
                                u(t, 3, .3, i),
                                t.fill(),
                                t.stroke(),
                                t.translate(-o, -n)
                            }
                        else
                            u(t, 3, .3, 0),
                            t.fill(),
                            t.stroke()
                    }
                    function p(e=n.ej, t=!1, a=s.Tj.white) {
                        h(e, (0,
                        n.Lh)(a, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        u(e, 3, 1, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function F(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.fillStyle = s.Tj.white,
                        e.beginPath(),
                        e.arc(.25, -.25, .25, 0, c),
                        e.closePath(),
                        e.fill()
                    }
                    const w = new Path2D("M.64.35C.71.57.57.71.35.64Q0 0-.64-.35C-.71-.57-.57-.71-.35-.64Q.35-.35.64.35");
                    function y(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * t), .2),
                        e.fill(w),
                        e.stroke(w)
                    }
                    function v(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.rockGray, "#FF0000", .5 * t), .2),
                        u(e, 5, 1, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function P(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.cactusGreen, "#FF0000", .5 * t), .125),
                        d(e, 8, 1, 2.5),
                        e.fill(),
                        e.stroke(),
                        e.fillStyle = (0,
                        n.Lh)(s.Tj.cactusLightGreen, "#FF0000", .5 * t),
                        e.beginPath(),
                        e.arc(0, 0, .6, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function j(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.leafGreen, "#FF0000", .5 * t), .15),
                        e.beginPath(),
                        e.moveTo(-.6609, .4525),
                        e.quadraticCurveTo(-.2989, .6336, .1536, .5431),
                        e.quadraticCurveTo(.5157, .4525, .7872, .2715),
                        e.quadraticCurveTo(1.104, .0453, .8777, -.181),
                        e.quadraticCurveTo(.6062, -.4525, .1536, -.5431),
                        e.quadraticCurveTo(-.2989, -.6336, -.7062, -.4073),
                        e.quadraticCurveTo(-1.2493, .0453, -.6609, .4525),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.beginPath(),
                        e.moveTo(.6, 0),
                        e.quadraticCurveTo(0, .1, -.6, 0),
                        e.moveTo(-1, 0),
                        e.quadraticCurveTo(-1.3, -.05, -1.35, -.1),
                        e.stroke(),
                        e.closePath()
                    }
                    function C(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, Math.PI),
                        e.quadraticCurveTo(0, .85, 1, 0),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    const M = new Path2D("M.9 0A.05.05 90 00.65-.3Q0-.03-.65-.3A.05.05 90 00-.9 0 .05.05 90 00-.65.3Q0 .03.65.3A.05.05 90 00.9 0");
                    function S(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)((0,
                        n.Lh)(s.Tj.white, s.Tj.cumWhite, .5 + .5 * Math.sin(performance.now() / 100)), "#FF0000", t), .125),
                        e.fill(M),
                        e.stroke(M)
                    }
                    function x(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)((0,
                        n.Lh)(s.Tj.scorpionBrown, s.Tj.spider, .25), "#FF0000", .75 * t), .3),
                        d(e, 7, 1, 1.5),
                        e.fill(),
                        e.stroke()
                    }
                    function A(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.ladybugRed, "#FF0000", .75 * t), .2),
                        d(e, 9, 1.1, 4),
                        e.fill(),
                        e.stroke(),
                        h(e, (0,
                        n.Lh)(e.fillStyle, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .75 * t), .2), .2),
                        e.beginPath(),
                        e.arc(0, 0, .75, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function E(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.beeYellow, "#FF0000", .75 * t), .2),
                        e.beginPath(),
                        e.moveTo(.85, .85),
                        e.quadraticCurveTo(1.3, 0, .85, -.85),
                        e.bezierCurveTo(.55, -1.3, -.05, -.95, -.9, -.65),
                        e.quadraticCurveTo(0, 0, -.9, .65),
                        e.bezierCurveTo(-.05, .95, .55, 1.3, .85, .85),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function L(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.sand, "#FF0000", .5 * t), .4),
                        u(e, 6, 1, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function I(e=n.ej) {
                        h(e, s.Tj.sand, .2);
                        for (let t = 0; t < 4; t++) {
                            const a = c / 4 * t;
                            e.save(),
                            e.translate(.75 * Math.cos(a), .75 * Math.sin(a)),
                            u(e, 6, .4, t / 5),
                            e.fill(),
                            e.stroke(),
                            e.restore()
                        }
                    }
                    function D(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.orange, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        h(e, (0,
                        n.Lh)(s.Tj.leafGreen, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.moveTo(0, -1),
                        e.quadraticCurveTo(.7, -1.5, 1.4, -.9),
                        e.quadraticCurveTo(.6, -.5, 0, -1),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function q(e=n.ej) {
                        for (let t = 0; t < 3; t++) {
                            const a = c / 3 * t;
                            e.save(),
                            e.translate(.75 * Math.cos(a), .75 * Math.sin(a)),
                            e.scale(.6, .6),
                            D(e, !1),
                            e.restore()
                        }
                    }
                    function R(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.moveTo(1, 0),
                        e.lineTo(-.9, -.667),
                        e.lineTo(-.9, .667),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function U(e=n.ej, t=!1) {
                        const a = (0,
                        n.Lh)("#FFFFFF", "#FF0000", .5 * t)
                          , i = (0,
                        n.Lh)("#EAEAEA", "#FF0000", .5 * t)
                          , o = (0,
                        n.Lh)("#333333", "#FF0000", .5 * t)
                          , s = (0,
                        n.Lh)("#303030", "#FF0000", .5 * t);
                        e.lineWidth = .2,
                        e.fillStyle = a,
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c, !1),
                        e.closePath(),
                        e.fill(),
                        e.fillStyle = o,
                        e.beginPath(),
                        e.arc(0, 0, 1, -Math.PI / 2, Math.PI / 2, !1),
                        e.closePath(),
                        e.fill(),
                        e.fillStyle = o,
                        e.beginPath(),
                        e.arc(0, .5, .5, 0, c, !1),
                        e.closePath(),
                        e.fill(),
                        e.fillStyle = a,
                        e.beginPath(),
                        e.arc(0, -.5, .5, 0, c, !1),
                        e.closePath(),
                        e.fill(),
                        e.strokeStyle = s,
                        e.beginPath(),
                        e.arc(0, 0, 1, -Math.PI / 2, 0, !1),
                        e.stroke(),
                        e.closePath(),
                        e.strokeStyle = i,
                        e.beginPath(),
                        e.arc(0, 0, 1, -Math.PI / 2, Math.PI / 2, !0),
                        e.stroke(),
                        e.closePath(),
                        e.strokeStyle = s,
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, Math.PI / 2, !1),
                        e.stroke(),
                        e.closePath(),
                        e.strokeStyle = s,
                        e.beginPath(),
                        e.arc(0, .5, .5, -Math.PI / 2, Math.PI / 2, !0),
                        e.stroke(),
                        e.closePath(),
                        e.strokeStyle = i,
                        e.beginPath(),
                        e.arc(0, -.5, .5, -Math.PI / 2, Math.PI / 2, !1),
                        e.stroke(),
                        e.closePath(),
                        e.fillStyle = a,
                        e.beginPath(),
                        e.arc(0, .5, .15, 0, c, !1),
                        e.closePath(),
                        e.fill(),
                        e.fillStyle = o,
                        e.beginPath(),
                        e.arc(0, -.5, .15, 0, c, !1),
                        e.closePath(),
                        e.fill()
                    }
                    const B = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5];
                    function z(e, t=n.ej) {
                        const a = B[e];
                        if (h(t, s.Tj.pollenGold, a > 0 ? .1 : .2),
                        a > 1)
                            for (let e = a; e > 0; e--) {
                                const i = c / a * e;
                                t.beginPath(),
                                t.arc(.5 * Math.cos(i), .5 * Math.sin(i), .3, 0, c),
                                t.fill(),
                                t.stroke(),
                                t.closePath()
                            }
                        else
                            t.beginPath(),
                            t.arc(0, 0, .3, 0, c),
                            t.fill(),
                            t.stroke()
                    }
                    function H(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.honeyGold, "#FF0000", .5 * t), .225),
                        u(e, 6, 1, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function _(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * t), .2),
                        d(e, 5, 1, 1.5),
                        e.fill(),
                        e.stroke()
                    }
                    const O = ( () => {
                        const e = new OffscreenCanvas(512,512)
                          , t = e.getContext("2d");
                        t.scale(256, 256),
                        t.translate(1, 1),
                        t.scale(.95, .95),
                        t.lineCap = "round",
                        t.lineJoin = "round",
                        h(t, s.Tj.white, .1),
                        d(t, 13, 1, 5),
                        t.stroke(),
                        d(t, 13, .8, 5),
                        t.stroke(),
                        d(t, 13, .6, 5),
                        t.stroke(),
                        d(t, 13, .4, 5),
                        t.stroke(),
                        t.beginPath();
                        for (let e = 0; e < 13; e++)
                            t.moveTo(0, 0),
                            t.lineTo(1.1 * Math.cos(c / 13 * e), 1.1 * Math.sin(c / 13 * e));
                        return t.stroke(),
                        t.closePath(),
                        t => {
                            t.drawImage(e, -1, -1, 2, 2)
                        }
                    }
                    )();
                    function G(e=n.ej, t=!1) {
                        e.fillStyle = (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * t),
                        e.strokeStyle = e.fillStyle,
                        e.lineWidth = .1,
                        e.beginPath(),
                        e.moveTo(0, -1),
                        e.quadraticCurveTo(-1, 0, 0, 1),
                        e.quadraticCurveTo(1, 0, 0, -1),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.fillStyle = (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * t),
                        e.beginPath(),
                        e.arc(0, 0, .5, 0, c),
                        e.closePath(),
                        e.fill()
                    }
                    function W(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.moveTo(-1, -.2),
                        e.quadraticCurveTo(-.2, -.95, .9, .2),
                        e.lineTo(.9, .2),
                        e.quadraticCurveTo(.2, -.1, -1, .2),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function N(e, t=n.ej, a=!1) {
                        const i = .9 + .025 * e;
                        h(t, (0,
                        n.Lh)(s.Tj.peach, "#FF0000", .5 * a), .2),
                        t.beginPath(),
                        t.ellipse(0, 0, .775 * i, i, 0, 0, c),
                        t.closePath(),
                        t.fill(),
                        t.stroke()
                    }
                    function Q(e=n.ej) {
                        e.save(),
                        h(e, s.Tj.lighterBlack, .1),
                        e.scale(1.5, 1.5),
                        e.beginPath(),
                        e.moveTo(.16, 0),
                        e.quadraticCurveTo(.18, -.51, .49, -.83),
                        e.quadraticCurveTo(.3, -.41, .16, 0),
                        e.moveTo(-.16, 0),
                        e.quadraticCurveTo(-.18, -.51, -.49, -.83),
                        e.quadraticCurveTo(-.3, -.41, -.16, 0),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.restore()
                    }
                    function X(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.peaGreen, "#FF0000", .5 * t), .2);
                        for (let t = 0; t < 4; t++) {
                            const a = t * c / 4 + c / 8;
                            e.beginPath(),
                            e.arc(.75 * Math.cos(a), .75 * Math.sin(a), .75, 0, c),
                            e.closePath(),
                            e.fill(),
                            e.stroke()
                        }
                    }
                    function V(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.spider, "#FF0000", .5 * t), .4),
                        e.beginPath(),
                        e.moveTo(-1, 0),
                        e.lineTo(1, 0),
                        e.moveTo(-.6, -.6),
                        e.lineTo(-.75, .4),
                        e.moveTo(.6, -.4),
                        e.lineTo(.8, .8),
                        e.stroke(),
                        e.closePath()
                    }
                    function Y(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.moveTo(1, 0),
                        e.lineTo(-.85, -1.15),
                        e.lineTo(-.85, 1.15),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function $(e=n.ej) {
                        h(e, s.Tj.rosePink, .2);
                        for (let t = 0; t < 3; t++) {
                            const a = c / 3 * t + c / 12;
                            e.beginPath(),
                            e.arc(.5 * Math.cos(a), .5 * Math.sin(a), .3, 0, c),
                            e.closePath(),
                            e.fill(),
                            e.stroke()
                        }
                    }
                    function K(e=n.ej, t=!1, a=!1) {
                        a && (e.shadowColor = "#FFFFFF",
                        e.shadowBlur = 10,
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.closePath(),
                        e.fill()),
                        h(e, (0,
                        n.Lh)(s.Tj.honeyGold, "#FF0000", .5 * t), .15),
                        e.rotate(Math.PI / 6),
                        d(e, 3, 1.2, .1),
                        e.rotate(-Math.PI / 6),
                        e.fill(),
                        e.stroke(),
                        d(e, 3, .8, .1),
                        e.fill(),
                        e.stroke(),
                        h(e, (0,
                        n.Lh)(s.Tj.rosePink, "#FF0000", .5 * t), .075);
                        for (let t = 0; t < 3; t++) {
                            const a = c / 3 * t + c / 6;
                            e.beginPath(),
                            e.arc(.3 * Math.cos(a), .3 * Math.sin(a), .12, 0, c),
                            e.closePath(),
                            e.fill(),
                            e.stroke()
                        }
                    }
                    function J(e=n.ej, t=!1, a=!1, i=0) {
                        switch (a && (e.shadowColor = "#C85555",
                        e.shadowBlur = 10 + 5 * Math.sin(performance.now() / 300),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.closePath(),
                        e.fill()),
                        e.shadowBlur = 0,
                        h(e, (0,
                        n.Lh)(s.Tj.book, "#FF0000", .5 * t), .15),
                        e.beginPath(),
                        e.rect(-1, -1, 2, 2),
                        e.fill(),
                        e.stroke(),
                        e.strokeStyle = (0,
                        n.Lh)((0,
                        n.Lh)(s.Tj.bookSpine, "#000000", .2), "#FF0000", .5 * t),
                        e.lineWidth = .2,
                        e.beginPath(),
                        e.moveTo(-1, -1),
                        e.lineTo(-1, 1),
                        e.stroke(),
                        i) {
                        case 0:
                            h(e, (0,
                            n.Lh)(s.Tj.evilLadybugRed, "#FF0000", .5 * t), .1),
                            u(e, 5, .35, 0),
                            e.fill(),
                            e.stroke();
                            break;
                        case 1:
                            h(e, (0,
                            n.Lh)(s.Tj.rockGray, "#FF0000", .5 * t), .1),
                            u(e, 6, .35, 0),
                            e.fill(),
                            e.stroke()
                        }
                    }
                    const Z = c / 12;
                    function ee(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.lightningTeal, "#FF0000", .5 * t), .125),
                        e.beginPath();
                        for (let t = 0; t < 3; t++) {
                            const a = t * c / 3
                              , i = a - Z
                              , o = a + Z
                              , n = a + Math.PI / 3
                              , s = a + Math.PI / 3 * 2;
                            e.lineTo(.75 * Math.cos(i), .75 * Math.sin(i)),
                            e.lineTo(Math.cos(a), Math.sin(a)),
                            e.bezierCurveTo(.75 * Math.cos(o), .75 * Math.sin(o), .5 * Math.cos(n), .5 * Math.sin(n), .5 * Math.cos(s), .5 * Math.sin(s))
                        }
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function te(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.lightningTeal, "#FF0000", .5 * t), .125),
                        g(e, 10, 1, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function ae(e=n.ej) {
                        e.fillStyle = s.Tj.white;
                        for (let t = 0; t < 8; t++) {
                            const a = c / 8 * t
                              , i = t % 3 == 0 ? .5 : .25;
                            e.beginPath(),
                            e.arc(Math.cos(a) * i, Math.sin(a) * i, .3, 0, c),
                            e.closePath(),
                            e.fill()
                        }
                    }
                    function ie(e, t=n.ej, a=!1) {
                        t.fillStyle = (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * a);
                        for (let a = 0; a < 8; a++) {
                            const i = c / 8 * a + Math.cos(.005 * performance.now() - e) + 4 * e + .05 * a
                              , o = (a % 3 == 0 ? .6 : .4) * (.5 * Math.sin(.005 * performance.now() + 3 * e + .2 * a) + .6);
                            t.beginPath(),
                            t.arc(Math.cos(i) * o, Math.sin(i) * o, .5 * (.3 * Math.cos(.005 * performance.now() + 5 * e + .2 * a) + 1), 0, c),
                            t.closePath(),
                            t.fill()
                        }
                    }
                    function oe(e=n.ej) {
                        h(e, s.Tj.peach, .2);
                        for (let t = 0; t < 4; t++) {
                            const a = t * c / 4;
                            e.beginPath(),
                            e.arc(.6 * Math.cos(a), .6 * Math.sin(a), .75, 0, c),
                            e.closePath(),
                            e.fill(),
                            e.stroke()
                        }
                    }
                    function ne(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.peaGreen, "#FF0000", .5 * t), .225),
                        e.beginPath(),
                        e.moveTo(1.1, 0),
                        e.bezierCurveTo(.5, -.9, -.5, -.7, -1.1, 0),
                        e.bezierCurveTo(-.9, .9, .5, .7, 1.1, 0),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.beginPath(),
                        e.moveTo(1, 0),
                        e.quadraticCurveTo(.4, -.4, -1, 0),
                        e.stroke()
                    }
                    const se = new Path2D("M-.03 0-.36-0Q-.4-.21-.2-.4-.01-.56.45-.43A.04.04-88.1 01.33-.11Q.18-.17.05-.15-.05-.13-.03 0Z")
                      , re = new Path2D("M-.03 0-.36 0Q-.4.21-.2.4-.01.56.45.43A.04.04 90 00.33.11Q.18.17.05.15-.05.13-.03 0Z");
                    function le(e=n.ej, t=!1) {
                        e.save(),
                        e.scale(2, 2),
                        h(e, (0,
                        n.Lh)("#4343A4", "#FF0000", .5 * t), .15),
                        e.fill(se),
                        e.stroke(se),
                        h(e, (0,
                        n.Lh)("#A44343", "#FF0000", .5 * t), .15),
                        e.fill(re),
                        e.stroke(re),
                        e.restore()
                    }
                    function ce(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.sandGold, "#FF0000", .5 * t), .15),
                        e.beginPath();
                        for (let t = 0; t < 3; t++) {
                            const a = t * c / 3
                              , i = a - Z
                              , o = a + Z
                              , n = a + Math.PI / 3
                              , s = a + Math.PI / 3 * 2;
                            e.lineTo(Math.cos(i), Math.sin(i)),
                            e.lineTo(Math.cos(a), Math.sin(a)),
                            e.bezierCurveTo(Math.cos(o), Math.sin(o), .4 * Math.cos(n), .4 * Math.sin(n), .3 * Math.cos(s), .3 * Math.sin(s))
                        }
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.beginPath(),
                        e.arc(0, 0, .15, 0, c),
                        e.fillStyle = s.Tj.cactusLightGreen,
                        e.fill()
                    }
                    function he(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.jelly, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.closePath(),
                        e.globalAlpha = .7,
                        e.fill(),
                        e.globalAlpha = 1,
                        e.stroke(),
                        e.fillStyle = e.strokeStyle,
                        e.globalAlpha = .7,
                        e.beginPath(),
                        e.arc(-.1, .35, .4, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.beginPath(),
                        e.arc(.5, -.4, .2, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.beginPath(),
                        e.arc(-.4, -.3, .3, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.closePath(),
                        e.globalAlpha = 1
                    }
                    function de(e=n.ej, t=!1) {
                        const a = (0,
                        n.Lh)("#aa853f", "#FF0000", .5 * t)
                          , i = (0,
                        n.Lh)("#876e36", "#FF0000", .5 * t);
                        e.lineCap = "round",
                        e.strokeStyle = i,
                        e.fillStyle = i,
                        e.beginPath(),
                        e.moveTo(1.13, .54),
                        e.quadraticCurveTo(1.2, .6, 1.16, .69),
                        e.quadraticCurveTo(1.13, .8, 1.03, .81),
                        e.quadraticCurveTo(-.52, .14, -.63, -1.13),
                        e.lineTo(-.56, -1.13),
                        e.quadraticCurveTo(-.1, .38, 1.13, .54),
                        e.lineWidth = .4,
                        e.fill(),
                        e.stroke(),
                        e.closePath(),
                        e.beginPath(),
                        e.moveTo(.72, .54),
                        e.quadraticCurveTo(.3, .97, -.49, .13),
                        e.quadraticCurveTo(-.92, -.44, -.57, -.98),
                        e.quadraticCurveTo(-.2, -1.01, .24, -.8),
                        e.quadraticCurveTo(1.31, -.2, .72, .54),
                        e.fill(),
                        e.closePath(),
                        e.beginPath(),
                        e.lineWidth = .4,
                        e.moveTo(.97, -.14),
                        e.quadraticCurveTo(.91, .24, .72, .54),
                        e.moveTo(.82, -.47),
                        e.quadraticCurveTo(.78, -.13, .61, .38),
                        e.moveTo(.66, -.7),
                        e.quadraticCurveTo(.64, -.38, .43, .26),
                        e.moveTo(.46, -.79),
                        e.quadraticCurveTo(.42, -.36, .22, .1),
                        e.moveTo(.26, -.92),
                        e.quadraticCurveTo(.21, -.59, .04, -.06),
                        e.moveTo(.02, -.97),
                        e.quadraticCurveTo(0, -.72, -.14, -.28),
                        e.moveTo(-.18, -1.04),
                        e.quadraticCurveTo(-.17, -.83, -.29, -.47),
                        e.moveTo(-.38, -1.07),
                        e.quadraticCurveTo(-.35, -.34, -.74, -.88),
                        e.moveTo(-.76, -.59),
                        e.quadraticCurveTo(-.61, -.49, -.4, -.46),
                        e.moveTo(-.78, -.34),
                        e.quadraticCurveTo(-.61, -.26, -.3, -.24),
                        e.moveTo(-.69, -.06),
                        e.quadraticCurveTo(-.47, -.04, -.15, -.09),
                        e.moveTo(-.65, .14),
                        e.quadraticCurveTo(-.47, .15, .05, .05),
                        e.moveTo(-.53, .33),
                        e.quadraticCurveTo(-.18, .32, .12, .2),
                        e.quadraticCurveTo(-.19, .31, .12, .2),
                        e.moveTo(-.35, .5),
                        e.quadraticCurveTo(.02, .47, .27, .35),
                        e.moveTo(-.08, .63),
                        e.quadraticCurveTo(.15, .6, .49, .47),
                        e.moveTo(.26, .72),
                        e.quadraticCurveTo(.5, .72, .72, .54),
                        e.stroke(),
                        e.strokeStyle = a,
                        e.fillStyle = a,
                        e.beginPath(),
                        e.moveTo(1.13, .54),
                        e.quadraticCurveTo(1.2, .6, 1.16, .69),
                        e.quadraticCurveTo(1.13, .8, 1.03, .81),
                        e.quadraticCurveTo(-.52, .14, -.63, -1.13),
                        e.lineTo(-.56, -1.13),
                        e.quadraticCurveTo(-.1, .38, 1.13, .54),
                        e.lineWidth = .1,
                        e.stroke(),
                        e.fill(),
                        e.closePath(),
                        e.lineCap = "square",
                        e.beginPath(),
                        e.lineWidth = .1,
                        e.moveTo(.72, .54),
                        e.quadraticCurveTo(.3, .97, -.49, .13),
                        e.quadraticCurveTo(-.92, -.44, -.57, -.98),
                        e.quadraticCurveTo(-.2, -1.01, .24, -.8),
                        e.quadraticCurveTo(1.31, -.2, .72, .54),
                        e.stroke(),
                        e.closePath(),
                        e.beginPath(),
                        e.lineWidth = .125,
                        e.moveTo(.97, -.14),
                        e.quadraticCurveTo(.91, .24, .72, .54),
                        e.moveTo(.82, -.47),
                        e.quadraticCurveTo(.78, -.13, .61, .38),
                        e.moveTo(.66, -.7),
                        e.quadraticCurveTo(.64, -.38, .43, .26),
                        e.moveTo(.46, -.79),
                        e.quadraticCurveTo(.42, -.36, .22, .1),
                        e.moveTo(.26, -.92),
                        e.quadraticCurveTo(.21, -.59, .04, -.06),
                        e.moveTo(.02, -.97),
                        e.quadraticCurveTo(0, -.72, -.14, -.28),
                        e.moveTo(-.18, -1.04),
                        e.quadraticCurveTo(-.17, -.83, -.29, -.47),
                        e.moveTo(-.38, -1.07),
                        e.quadraticCurveTo(-.35, -.34, -.74, -.88),
                        e.moveTo(-.76, -.59),
                        e.quadraticCurveTo(-.61, -.49, -.4, -.46),
                        e.moveTo(-.78, -.34),
                        e.quadraticCurveTo(-.61, -.26, -.3, -.24),
                        e.moveTo(-.69, -.06),
                        e.quadraticCurveTo(-.47, -.04, -.15, -.09),
                        e.moveTo(-.65, .14),
                        e.quadraticCurveTo(-.47, .15, .05, .05),
                        e.moveTo(-.53, .33),
                        e.quadraticCurveTo(-.18, .32, .12, .2),
                        e.quadraticCurveTo(-.19, .31, .12, .2),
                        e.moveTo(-.35, .5),
                        e.quadraticCurveTo(.02, .47, .27, .35),
                        e.moveTo(-.08, .63),
                        e.quadraticCurveTo(.15, .6, .49, .47),
                        e.moveTo(.26, .72),
                        e.quadraticCurveTo(.5, .72, .72, .54),
                        e.stroke(),
                        e.lineCap = "round"
                    }
                    function ue(e, t=n.ej, a=!1) {
                        h(t, (0,
                        n.Lh)(s.Tj.unique, "#FF0000", .5 * a), .2),
                        t.beginPath();
                        for (let a = 0; a < 5; a++) {
                            const i = c / 5 * a
                              , o = 1 + .2 * Math.sin(4 * e + 8 * a);
                            t.lineTo(Math.cos(i) * o, Math.sin(i) * o)
                        }
                        t.closePath(),
                        t.globalAlpha = .5,
                        t.fill(),
                        t.globalAlpha = 1,
                        t.stroke()
                    }
                    function ge(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.black, "#FF0000", .5 * t), .4),
                        e.beginPath(),
                        e.moveTo(-1.2, 0),
                        e.lineTo(0, 0),
                        e.stroke(),
                        e.closePath(),
                        h(e, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.arc(.2, 0, .75, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function fe(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.peach, "#FF0000", .5 * t), .125),
                        e.beginPath();
                        for (let t = 0; t < 7; t++) {
                            const a = t * c / 7
                              , i = a + c / 14;
                            if (0 === t) {
                                const t = a - c / 14;
                                e.moveTo(.7 * Math.cos(t), .7 * Math.sin(t))
                            }
                            e.quadraticCurveTo(1.2 * Math.cos(a), 1.2 * Math.sin(a), .7 * Math.cos(i), .7 * Math.sin(i))
                        }
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function me(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.peach, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.fillStyle = (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * t),
                        e.beginPath(),
                        e.arc(.25, -.25, .25, 0, c),
                        e.closePath(),
                        e.fill(),
                        e.strokeStyle = e.fillStyle,
                        e.beginPath(),
                        e.moveTo(-.65, -.35),
                        e.quadraticCurveTo(-.7, .15, -.35, .55),
                        e.stroke(),
                        e.closePath()
                    }
                    function Te(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.peach, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.moveTo(.3, -.95),
                        e.quadraticCurveTo(1.5, 0, .3, .95),
                        e.lineTo(-.8, .3),
                        e.quadraticCurveTo(-1, 0, -.8, -.3),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.beginPath(),
                        e.moveTo(.6, 0),
                        e.lineTo(-.3, 0),
                        e.moveTo(.2, -.5),
                        e.lineTo(-.45, -.175),
                        e.moveTo(.2, .5),
                        e.lineTo(-.45, .175),
                        e.stroke(),
                        e.closePath()
                    }
                    function be(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.arc(0, 0, 1, 0, c),
                        e.closePath(),
                        e.globalAlpha = .4,
                        e.fill(),
                        e.globalAlpha = 1,
                        e.stroke(),
                        e.fillStyle = (0,
                        n.Lh)(s.Tj.bubbleGrey, "#FF0000", .5 * t),
                        e.beginPath(),
                        e.arc(.25, -.25, .25, 0, c),
                        e.closePath(),
                        e.globalAlpha = .8,
                        e.fill(),
                        e.globalAlpha = 1
                    }
                    function ke(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.starfish, "#FF0000", .5 * t), .125),
                        e.beginPath(),
                        e.moveTo(-1.2, -.5),
                        e.lineTo(1, -.4),
                        e.arc(1, 0, .4, -Math.PI / 2, Math.PI / 2),
                        e.lineTo(-1.2, .5),
                        e.lineTo(-1.3, .3),
                        e.lineTo(-1.3, -.3),
                        e.closePath(),
                        e.fill(),
                        e.stroke(),
                        e.fillStyle = (0,
                        n.Lh)(e.fillStyle, s.Tj.white, .3),
                        e.beginPath(),
                        e.arc(-.75, 0, .4, 0, c),
                        e.moveTo(0, 0),
                        e.arc(0, 0, .3, 0, c),
                        e.moveTo(.667, 0),
                        e.arc(.667, 0, .2, 0, c),
                        e.fill(),
                        e.closePath()
                    }
                    function pe(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.evilLadybugRed, "#FF0000", .5 * t), .2),
                        e.beginPath(),
                        e.moveTo(1, 0),
                        e.lineTo(0, -.5),
                        e.lineTo(-1, 0),
                        e.lineTo(0, .5),
                        e.closePath(),
                        e.fill(),
                        e.stroke()
                    }
                    function Fe(e, t=n.ej, a=!1) {
                        h(t, (0,
                        n.Lh)(s.Tj.cumWhite, "#FF0000", .5 * a), .2);
                        const i = .25 * Math.sin(.005 * performance.now() + .1 * e) + .75
                          , o = .5 * Math.sin(.0075 * performance.now() + .1 * e + 1) + .75
                          , r = .3 * Math.sin(.001 * performance.now() + .1 * e + 2) + .75;
                        t.beginPath(),
                        t.arc(0, 0, 1, Math.PI / 2, -Math.PI / 2, !0),
                        t.bezierCurveTo(-1.5 * i, -1.3, -1.6 * o, -1.1, -2.2 * r, -1),
                        t.bezierCurveTo(-2.9 * o, -.8, -2.7 * r, -.5, -1.6 * i, -.6),
                        t.bezierCurveTo(-2.6 * r, -.4, -2.8 * i, -.2, -1.6 * o, 0),
                        t.bezierCurveTo(-3.7 * i, .8, -1.7 * r, 1.2, -1.1 * o, .9),
                        t.bezierCurveTo(-1.1, 1.4, -.2, 1.4, 0, 1),
                        t.closePath(),
                        t.fill(),
                        t.stroke()
                    }
                    function we(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.spider, "#FF0000", .5 * t), .2),
                        d(e, 7, 1.05, 1.3),
                        e.fill(),
                        e.stroke(),
                        h(e, (0,
                        n.Lh)((0,
                        n.Lh)(s.Tj.spider, s.Tj.cumWhite, .15), "#FF0000", .5 * t), .15),
                        d(e, 5, .6, .5),
                        e.fill(),
                        e.stroke(),
                        h(e, (0,
                        n.Lh)((0,
                        n.Lh)(s.Tj.spider, s.Tj.cumWhite, .3), "#FF0000", .5 * t), .1),
                        u(e, 8, .3),
                        e.fill(),
                        e.stroke()
                    }
                    function ye(e, t=n.ej, a=!1, i=!0) {
                        i && (t.fillStyle = "#FFE51C",
                        t.globalAlpha = .2,
                        t.beginPath(),
                        t.arc(0, 0, 2.5 + 1.75 * Math.sin(.005 * performance.now() + e), 0, c),
                        t.closePath(),
                        t.fill()),
                        t.globalAlpha = 1,
                        t.save(),
                        t.scale(1.15, 1.15),
                        h(t, (0,
                        n.Lh)("#ffe51c", "#FF0000", .5 * a), .2),
                        t.beginPath(),
                        t.moveTo(-.32, .39),
                        t.bezierCurveTo(-.34, .27, -.4, .17, -.45, .1),
                        t.bezierCurveTo(-.5, 0, -.57, -.1, -.57, -.24),
                        t.bezierCurveTo(-.55, -.55, -.3, -.8, 0, -.81),
                        t.bezierCurveTo(.3, -.8, .55, -.55, .57, -.24),
                        t.bezierCurveTo(.55, -.1, .5, 0, .45, .1),
                        t.bezierCurveTo(.4, .17, .34, .27, .32, .39),
                        t.lineTo(-.32, .39),
                        t.fill(),
                        t.stroke(),
                        t.closePath(),
                        h(t, (0,
                        n.Lh)("#666666", "#FF0000", .5 * a), .2),
                        t.beginPath(),
                        t.rect(-.36, .39, .72, .5),
                        t.fill(),
                        t.stroke(),
                        t.closePath(),
                        t.lineCap = "butt",
                        t.lineJoin = "miter",
                        t.strokeStyle = "#fff28d",
                        t.beginPath(),
                        t.moveTo(-.2, .3),
                        t.lineTo(-.3, -.2),
                        t.lineTo(-.15, -.05),
                        t.lineTo(0, -.2),
                        t.lineTo(.15, -.05),
                        t.lineTo(.3, -.2),
                        t.lineTo(.2, .3),
                        t.stroke(),
                        t.closePath(),
                        t.restore()
                    }
                    function ve(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)("#C8C8C8", "#FF0000", .5 * t), .2),
                        e.fillRect(-.25, -1, .5, .5),
                        e.strokeRect(-.25, -1, .5, .5),
                        h(e, (0,
                        n.Lh)("#323233", "#FF0000", .5 * t), .2),
                        e.fillRect(-.6, -.7, 1.2, 1.7),
                        e.strokeRect(-.6, -.7, 1.2, 1.7),
                        h(e, (0,
                        n.Lh)("#C98A5B", "#FF0000", .5 * t), .2),
                        e.fillRect(-.6, -.7, 1.2, .5),
                        e.strokeRect(-.6, -.7, 1.2, .5)
                    }
                    function Pe(e=n.ej) {
                        h(e, s.Tj.rockGray, .2);
                        for (let t = 0; t < 3; t++) {
                            const a = c / 3 * t;
                            e.save(),
                            e.translate(.5 * Math.cos(a), .5 * Math.sin(a)),
                            u(e, 5, .5, a),
                            e.fill(),
                            e.stroke(),
                            e.restore()
                        }
                    }
                    function je(e, t=!1, a=n.ej, i=0) {
                        if (o.wk.petalConfigs[e].drawing) {
                            const t = o.wk.petalConfigs[e].drawing.actions;
                            for (const e of t) {
                                const [t,...i] = e
                                  , o = r.H1.reverseActions[t];
                                if (!o)
                                    throw new Error(`Unknown action: ${t} ${e}`);
                                switch (o) {
                                case "circle":
                                    a.arc(i[0], i[1], i[2], 0, 2 * Math.PI);
                                    break;
                                case "line":
                                    a.moveTo(i[0], i[1]),
                                    a.lineTo(i[2], i[3]);
                                    break;
                                case "fill":
                                    a.fillStyle = i[0],
                                    a.fill();
                                    break;
                                case "stroke":
                                    a.strokeStyle = i[0],
                                    a.lineWidth = i[1],
                                    a.stroke();
                                    break;
                                case "paint":
                                    a.fillStyle = i[0],
                                    a.strokeStyle = (0,
                                    n.Lh)(i[0], "#000000", .2),
                                    a.lineWidth = i[1],
                                    a.fill(),
                                    a.stroke();
                                    break;
                                case "polygon":
                                    u(a, i[0], i[1], i[2]);
                                    break;
                                case "spikeBall":
                                    g(a, i[0], i[1], i[2]);
                                    break;
                                case "dipPolygon":
                                    d(a, i[0], i[1], i[2]);
                                    break;
                                case "opacity":
                                    a.globalAlpha = i[0];
                                    break;
                                case "blur":
                                    a.shadowColor = i[0],
                                    a.shadowBlur = i[1];
                                    break;
                                case "noBlur":
                                    a.shadowBlur = 0;
                                    break;
                                default:
                                    a[o](...i)
                                }
                            }
                        } else
                            switch (e) {
                            case 0:
                            case 1:
                                m(a, t, s.Tj.white);
                                break;
                            case 2:
                                m(a, t, s.Tj.cumWhite);
                                break;
                            case 3:
                                F(a, t);
                                break;
                            case 4:
                                p(a, t, s.Tj.stingerBlack);
                                break;
                            case 5:
                                y(a, t);
                                break;
                            case 6:
                                v(a, t);
                                break;
                            case 7:
                                P(a, t);
                                break;
                            case 8:
                                j(a, t);
                                break;
                            case 9:
                                C(a, t);
                                break;
                            case 10:
                                S(a, t);
                                break;
                            case 11:
                                x(a, t);
                                break;
                            case 12:
                                A(a, t);
                                break;
                            case 13:
                                E(a, t);
                                break;
                            case 14:
                                L(a, t);
                                break;
                            case 15:
                                D(a, t);
                                break;
                            case 16:
                                R(a, t);
                                break;
                            case 17:
                                m(a, t, s.Tj.peaGreen);
                                break;
                            case 18:
                            case 32:
                                m(a, t, s.Tj.rosePink);
                                break;
                            case 19:
                                U(a, t);
                                break;
                            case 20:
                                m(a, t, s.Tj.pollenGold);
                                break;
                            case 21:
                                H(a, t);
                                break;
                            case 22:
                                m(a, t, s.Tj.irisPurple);
                                break;
                            case 23:
                                _(a, t);
                                break;
                            case 24:
                                O(a, !1);
                                break;
                            case 25:
                                G(a, t);
                                break;
                            case 26:
                                W(a, t);
                                break;
                            case 27:
                                N(0, a, t);
                                break;
                            case 28:
                                Q(a);
                                break;
                            case 29:
                                X(a, t);
                                break;
                            case 30:
                                V(a, t);
                                break;
                            case 31:
                                Y(a, t);
                                break;
                            case 33:
                                K(a, t, !0);
                                break;
                            case 34:
                                J(a, t, !0, 0);
                                break;
                            case 35:
                                ee(a, t);
                                break;
                            case 36:
                                te(a, t);
                                break;
                            case 37:
                                ie(i, a, t);
                                break;
                            case 38:
                                m(a, t, s.Tj.peach);
                                break;
                            case 39:
                                ne(a, t);
                                break;
                            case 40:
                                le(a, t);
                                break;
                            case 41:
                                ce(a, t);
                                break;
                            case 42:
                                he(a, t);
                                break;
                            case 43:
                                de(a, t);
                                break;
                            case 44:
                                ue(i, a, t);
                                break;
                            case 45:
                                ge(a, t);
                                break;
                            case 46:
                                fe(a, t);
                                break;
                            case 47:
                                me(a, t);
                                break;
                            case 48:
                                Te(a, t);
                                break;
                            case 49:
                                be(a, t);
                                break;
                            case 50:
                                break;
                            case 51:
                                ke(a, t);
                                break;
                            case 52:
                                pe(a, t);
                                break;
                            case 53:
                                Fe(i, a, t);
                                break;
                            case 54:
                                we(a, t);
                                break;
                            case 55:
                                ye(i, a, t, !0);
                                break;
                            case 56:
                                ve(a, t);
                                break;
                            case 57:
                                h(a, (0,
                                n.Lh)(s.Tj.rockGray, "#FF0000", .5 * t), .2),
                                u(a, 5, 1, .001 * performance.now() + i),
                                a.fill(),
                                a.stroke();
                                break;
                            default:
                                console.log("Unknown petal index: " + e),
                                m(a, t, "#FF0000")
                            }
                    }
                    function Ce(e, t, a=n.ej) {
                        switch (e) {
                        case 1:
                            b(t, a);
                            break;
                        case 2:
                            a.save(),
                            a.scale(.6, .6),
                            m(a, !1, s.Tj.cumWhite),
                            a.restore();
                            break;
                        case 4:
                            k(t, a);
                            break;
                        case 14:
                            I(a);
                            break;
                        case 15:
                            q(a);
                            break;
                        case 20:
                            z(t, a);
                            break;
                        case 22:
                            a.save(),
                            a.scale(.9, .9),
                            m(a, !1, s.Tj.irisPurple),
                            a.restore();
                            break;
                        case 32:
                            $(a);
                            break;
                        case 33:
                            K(a, !1, !1);
                            break;
                        case 34:
                            J(a, !1, !1, 0);
                            break;
                        case 37:
                            ae(a);
                            break;
                        case 38:
                            oe(a);
                            break;
                        case 55:
                            ye(0, a, !1, !1);
                            break;
                        case 57:
                            Pe(a);
                            break;
                        default:
                            je(e, !1, a)
                        }
                    }
                    const Me = [];
                    function Se(e, t) {
                        const a = new OffscreenCanvas(128,128)
                          , i = a.getContext("2d");
                        i.textAlign = "center",
                        i.textBaseline = "middle",
                        i.lineCap = "round",
                        i.lineJoin = "round",
                        i.save(),
                        i.beginPath(),
                        i.roundRect(4, 4, 120, 120, 8),
                        i.strokeStyle = (0,
                        n.Lh)(o.wk.tiers[t].color, "#000000", .2),
                        i.fillStyle = o.wk.tiers[t].color,
                        i.lineWidth = 12,
                        i.fill(),
                        i.stroke(),
                        i.translate(64, 51.2),
                        i.scale(25.6, 25.6),
                        Ce(e, t, i),
                        i.restore();
                        let s = 30
                          , r = 0;
                        for (; i.font = `bold ${s}px sans-serif`,
                        !(i.measureText(o.wk.petalConfigs[e].name).width < 96 || r++ > 512); )
                            s--;
                        return (0,
                        n.Qq)(o.wk.petalConfigs[e].name, 64, 108, s, "#FFFFFF", i),
                        a
                    }
                    function xe(e, t) {
                        return Me[e] || (Me[e] = []),
                        Me[e][t] || (Me[e][t] = Se(e, t)),
                        Me[e][t]
                    }
                    const Ae = []
                      , Ee = new Path2D;
                    Ee.roundRect(4, 4, 120, 120, 8);
                    const Le = new Path2D;
                    Le.rect(0, 0, 128, 128);
                    const Ie = new OffscreenCanvas(128,128).getContext("2d");
                    function De(e, t) {
                        let a = 30
                          , i = 0;
                        for (; Ie.font = `bold ${a}px sans-serif`,
                        !(Ie.measureText(e).width < t || i++ > 512); )
                            a--;
                        return a
                    }
                    function qe(e, t, a, i, s, r, l=n.ej) {
                        l.save(),
                        l.translate(a, i),
                        l.scale(s / 128, s / 128),
                        l.clip(Le, "evenodd"),
                        l.fillStyle = (0,
                        n.Lh)(o.wk.tiers[t].color, "#000000", .2),
                        l.fill(Ee),
                        l.fillStyle = o.wk.tiers[t].color,
                        l.fillRect(4, 124, 120, -120 * r),
                        l.strokeStyle = (0,
                        n.Lh)(o.wk.tiers[t].color, "#000000", .2),
                        l.lineWidth = 12,
                        l.stroke(Ee),
                        l.save(),
                        l.translate(64, 51.2),
                        l.scale(25.6, 25.6),
                        Ce(e, t, l),
                        l.restore(),
                        void 0 === Ae[e] && (Ae[e] = De(o.wk.petalConfigs[e].name, 96)),
                        (0,
                        n.Qq)(o.wk.petalConfigs[e].name, 64, 108, Ae[e], "#FFFFFF", l),
                        l.restore()
                    }
                    function Re(e, t, a=!1, i=n.ej) {
                        const o = (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * a)
                          , r = (0,
                        n.Lh)(t, "#FF0000", .5 * a);
                        i.beginPath(),
                        i.arc(.2, 0, .7, 0, c),
                        h(i, o, .15),
                        i.fill(),
                        i.stroke(),
                        i.fillStyle = r,
                        i.beginPath(),
                        i.arc(0, 0, 1, .2125 * -Math.PI, .2125 * Math.PI, !0),
                        i.arc(.9, 0, .625, .6 * Math.PI, .6 * -Math.PI, !1),
                        i.closePath(),
                        i.fill(),
                        i.save(),
                        i.clip(),
                        i.fillStyle = o;
                        const l = 2 + 10 * Math.abs(.667 * Math.sin(e)) | 0;
                        for (let t = 0; t < l; t++) {
                            const a = Math.sin(100 * t + e) * c
                              , o = .1 * Math.sin(1e3 * t + e) + .2
                              , n = .3 * Math.sin(1e4 * t + e) + .7;
                            i.beginPath(),
                            i.arc(Math.cos(a) * n, Math.sin(a) * n, o, 0, c),
                            i.fill()
                        }
                        i.restore(),
                        h(i, r, .15),
                        i.beginPath(),
                        i.arc(0, 0, 1, .2125 * -Math.PI, .2125 * Math.PI, !0),
                        i.arc(.9, 0, .625, .6 * Math.PI, .6 * -Math.PI, !1),
                        i.closePath(),
                        i.stroke()
                    }
                    function Ue(e, t, a=!1, i=n.ej) {
                        const o = Math.max(5 + t, 4 + (8 + t) * ((.5 * Math.sin(e) + .25) * (.25 * (t + 1))))
                          , r = c / o;
                        h(i, (0,
                        n.Lh)(s.Tj.rockGray, "#FF0000", .5 * a), .2 / (.1 * t + 1)),
                        i.beginPath(),
                        i.moveTo(1 * Math.cos(0), 1 * Math.sin(0));
                        for (let t = 1; t < o; t++) {
                            const a = 1 + .1 * Math.sin(1e3 * t + e) * (t % 2 ? .5 : 0);
                            let o = r * t;
                            t % 3 == 0 && (o += .1 * Math.sin(e)),
                            i.lineTo(Math.cos(o) * a, Math.sin(o) * a)
                        }
                        i.closePath(),
                        i.fill(),
                        i.stroke()
                    }
                    function Be(e, t=!1, a=n.ej) {
                        const i = (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t)
                          , o = (0,
                        n.Lh)(s.Tj.beeYellow, "#FF0000", .5 * t);
                        a.fillStyle = a.strokeStyle = i,
                        a.lineWidth = .1;
                        const r = (performance.now() + 120 * e) % (3e3 + 2 * e) > 2500 + 2 * e ? .025 * Math.sin(performance.now() / 60 + .1 * e) : 0;
                        a.beginPath(),
                        a.moveTo(-1.23, r),
                        a.lineTo(-.65, -.41),
                        a.lineTo(-.65, .41),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        h(a, o, .1),
                        a.beginPath(),
                        a.ellipse(0, 0, 1, .667, 0, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.save(),
                        a.clip(),
                        a.beginPath(),
                        a.rect(-1, -1, .334, 2),
                        a.rect(-.334, -1, .334, 2),
                        a.rect(.334, -1, .334, 2),
                        a.fillStyle = i,
                        a.fill(),
                        a.restore(),
                        a.beginPath(),
                        a.ellipse(0, 0, 1, .667, 0, 0, c),
                        a.closePath(),
                        a.stroke();
                        const l = 1 + .1 * Math.sin(performance.now() / 334 + .2 * e);
                        h(a, i, .1),
                        a.beginPath(),
                        a.moveTo(.85, -.15),
                        a.quadraticCurveTo(1.25, -.2, 1.4, -.45 * l),
                        a.moveTo(.85, .15),
                        a.quadraticCurveTo(1.25, .2, 1.4, .45 * l),
                        a.stroke(),
                        a.beginPath(),
                        a.arc(1.4, -.45 * l, .15, 0, c),
                        a.arc(1.4, .45 * l, .15, 0, c),
                        a.closePath(),
                        a.fill()
                    }
                    function ze(e, t=!1, a=!1, i=n.ej) {
                        i.strokeStyle = (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * a),
                        i.lineWidth = .2,
                        i.beginPath();
                        for (let a = 0; a < 4; a++) {
                            const o = .52 * a - .79 + .2 * Math.cos(performance.now() * (.0025 + .0125 * t) + a + e / 3);
                            i.rotate(o),
                            i.moveTo(0, -2.2),
                            i.quadraticCurveTo(.2, -1, 0, 0),
                            i.quadraticCurveTo(-.2, 1, 0, 2.2),
                            i.rotate(-o)
                        }
                        i.stroke(),
                        i.closePath(),
                        h(i, (0,
                        n.Lh)(s.Tj.spider, "#FF0000", .5 * a), .2),
                        i.beginPath(),
                        i.arc(0, 0, 1, 0, c),
                        i.closePath(),
                        i.fill(),
                        i.stroke()
                    }
                    function He(e, t, a=!1, i=n.ej, o=!1) {
                        const r = .15 * Math.sin(performance.now() * (.0075 + .0075 * o) + e / 4) + Math.PI / 20;
                        h(i, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * a), .1),
                        i.save(),
                        i.translate(.9, -.4),
                        i.rotate(r),
                        i.beginPath(),
                        i.lineTo(-.2805, -.1445),
                        i.quadraticCurveTo(.306, -.374, .6885, -.085),
                        i.quadraticCurveTo(.7905, -.0085, .697, .0765),
                        i.quadraticCurveTo(.3655, 0, -.2125, .204),
                        i.closePath(),
                        i.fill(),
                        i.rotate(-r),
                        i.translate(0, .8),
                        i.rotate(-r),
                        i.beginPath(),
                        i.lineTo(-.2805, .1445),
                        i.quadraticCurveTo(.306, .374, .6885, .085),
                        i.quadraticCurveTo(.7905, .0085, .697, -.0765),
                        i.quadraticCurveTo(.3655, 0, -.2125, -.204),
                        i.closePath(),
                        i.fill(),
                        i.restore(),
                        h(i, (0,
                        n.Lh)(t, "#FF0000", .5 * a), .125),
                        i.beginPath(),
                        i.moveTo(1, 0),
                        i.bezierCurveTo(1, 1, -1, 1, -1, 0),
                        i.bezierCurveTo(-1, -1, 1, -1, 1, 0),
                        i.fill(),
                        i.stroke(),
                        i.closePath(),
                        i.beginPath(),
                        i.moveTo(-.667, -.025),
                        i.quadraticCurveTo(.1, .1, .667, -.025),
                        i.stroke(),
                        i.closePath(),
                        i.beginPath(),
                        i.arc(-.45, -.3, .15, 0, c),
                        i.arc(0, -.3, .15, 0, c),
                        i.arc(.45, -.3, .15, 0, c),
                        i.moveTo(-.45, .3),
                        i.arc(-.45, .3, .15, 0, c),
                        i.arc(0, .3, .15, 0, c),
                        i.arc(.45, .3, .15, 0, c),
                        i.fillStyle = i.strokeStyle,
                        i.fill()
                    }
                    function _e(e, t=!1, a=!1, i=n.ej) {
                        i.strokeStyle = (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * a),
                        i.lineWidth = .2,
                        i.beginPath();
                        for (let a = 0; a < 4; a++) {
                            const o = .52 * a - .79 + .2 * Math.cos(performance.now() * (.0025 + .0125 * t) + a + e / 3);
                            i.rotate(o),
                            i.moveTo(-.1, -.8),
                            i.quadraticCurveTo(.1, -.8, -.1, 0),
                            i.quadraticCurveTo(.1, .8, -.1, .8),
                            i.rotate(-o)
                        }
                        i.stroke(),
                        i.closePath();
                        const o = .15 * Math.sin(performance.now() * (.005 + .01 * t) + e / 4) + Math.PI / 10;
                        i.fillStyle = i.strokeStyle,
                        i.save(),
                        i.translate(.6, -.2),
                        i.rotate(o),
                        f(i),
                        i.rotate(-o),
                        i.scale(1, -1),
                        i.translate(0, -.4),
                        i.rotate(o),
                        f(i),
                        i.rotate(-o),
                        i.restore(),
                        h(i, (0,
                        n.Lh)(s.Tj.leafGreen, "#FF0000", .5 * a), .125),
                        i.beginPath(),
                        i.moveTo(.6609, .4525),
                        i.quadraticCurveTo(.2989, .6336, -.1536, .5431),
                        i.quadraticCurveTo(-.5157, .4525, -.7872, .2715),
                        i.quadraticCurveTo(-1.104, .0453, -.8777, -.181),
                        i.quadraticCurveTo(-.6062, -.4525, -.1536, -.5431),
                        i.quadraticCurveTo(.2989, -.6336, .7062, -.4073),
                        i.quadraticCurveTo(1.2493, .0453, .6609, .4525),
                        i.closePath(),
                        i.fill(),
                        i.stroke(),
                        i.beginPath(),
                        i.moveTo(.65, .05),
                        i.lineTo(.55, 0),
                        i.lineTo(.25, .25),
                        i.lineTo(.5, 0),
                        i.lineTo(0, 0),
                        i.lineTo(-.3, .25),
                        i.lineTo(-.1, 0),
                        i.lineTo(-.55, 0),
                        i.lineTo(-.1, 0),
                        i.lineTo(-.3, -.25),
                        i.lineTo(0, 0),
                        i.lineTo(.5, 0),
                        i.lineTo(.25, -.25),
                        i.lineTo(.55, 0),
                        i.lineTo(.65, -.05),
                        i.closePath(),
                        i.stroke()
                    }
                    function Oe(e=!1, t=n.ej) {
                        h(t, (0,
                        n.Lh)(s.Tj.roachHead, "#FF0000", .5 * e), .125),
                        t.beginPath(),
                        t.arc(.6, 0, .4, 0, c),
                        t.closePath(),
                        t.fill(),
                        t.stroke(),
                        h(t, (0,
                        n.Lh)(s.Tj.roach, "#FF0000", .5 * e), .125),
                        t.beginPath(),
                        t.ellipse(0, 0, 1, .65, 0, .675, -.675),
                        t.quadraticCurveTo(.3, 0, .785, .35),
                        t.closePath(),
                        t.fill(),
                        t.stroke(),
                        t.fillStyle = t.strokeStyle,
                        t.beginPath(),
                        t.ellipse(.3, -.25, .15, .2, Math.PI / 10, 0, c),
                        t.ellipse(.3, .25, .15, .2, -Math.PI / 10, 0, c),
                        t.closePath(),
                        t.fill(),
                        t.beginPath(),
                        t.moveTo(-.6, .15),
                        t.quadraticCurveTo(-.3, .35, 0, .3),
                        t.moveTo(-.6, -.15),
                        t.quadraticCurveTo(-.3, -.35, 0, -.3),
                        t.stroke(),
                        t.closePath(),
                        h(t, (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * e), .125),
                        t.beginPath(),
                        t.moveTo(.85, .16),
                        t.quadraticCurveTo(1.36, .18, 1.68, .49),
                        t.quadraticCurveTo(1.26, .3, .85, .16),
                        t.moveTo(.85, -.16),
                        t.quadraticCurveTo(1.36, -.18, 1.68, -.49),
                        t.quadraticCurveTo(1.26, -.3, .85, -.16),
                        t.closePath(),
                        t.fill(),
                        t.stroke()
                    }
                    function Ge(e, t, a, i=!1, o=n.ej) {
                        const s = (0,
                        n.Lh)(t, "#FF0000", .5 * i)
                          , r = (0,
                        n.Lh)(a, "#FF0000", .5 * i);
                        h(o, r, .1);
                        const l = (performance.now() + 240 * e) % (9e3 + 8 * e) > 8500 + 4 * e ? .025 * Math.sin(performance.now() / 60 + .1 * e) : 0;
                        o.beginPath(),
                        o.moveTo(-1.55, l),
                        o.lineTo(-.25, -.4),
                        o.lineTo(-.25, .4),
                        o.closePath(),
                        o.fill(),
                        o.stroke(),
                        h(o, s, .1),
                        o.beginPath(),
                        o.ellipse(0, 0, 1, .667, 0, 0, c),
                        o.closePath(),
                        o.fill(),
                        o.save(),
                        o.clip(),
                        o.beginPath(),
                        o.rect(-1, -1, .334, 2),
                        o.rect(-.334, -1, .334, 2),
                        o.rect(.334, -1, .334, 2),
                        o.fillStyle = r,
                        o.fill(),
                        o.restore(),
                        o.beginPath(),
                        o.ellipse(0, 0, 1, .667, 0, 0, c),
                        o.closePath(),
                        o.stroke(),
                        h(o, r, .1),
                        o.beginPath(),
                        o.moveTo(.85, .16),
                        o.quadraticCurveTo(1.36, .18, 1.68, .49),
                        o.quadraticCurveTo(1.26, .3, .85, .16),
                        o.moveTo(.85, -.16),
                        o.quadraticCurveTo(1.36, -.18, 1.68, -.49),
                        o.quadraticCurveTo(1.26, -.3, .85, -.16),
                        o.closePath(),
                        o.fill(),
                        o.stroke()
                    }
                    function We(e, t=!1, a=!1, i=n.ej) {
                        const o = (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * a);
                        h(i, o, .125),
                        i.beginPath();
                        const r = t ? .0075 : .0025;
                        for (let t = 0; t < 3; t++) {
                            const a = [0, .1, .3][t];
                            i.moveTo(.35 - .25 * t, -.2),
                            i.lineTo(.5 - .4 * t - a - .1 * Math.sin(performance.now() * r + e / 6 + t), .75 + .2 * Math.sin(t + .5)),
                            i.moveTo(.35 - .25 * t, .2),
                            i.lineTo(.5 - .4 * t - a + .1 * Math.sin(performance.now() * r + e / 3 + t / 3), -.75 - .2 * Math.sin(t + .5))
                        }
                        i.stroke(),
                        i.closePath(),
                        h(i, (0,
                        n.Lh)(s.Tj.peaGreen, "#FF0000", .5 * a), .125),
                        i.beginPath(),
                        i.ellipse(0, 0, 1, .65, 0, 0, c),
                        i.closePath(),
                        i.fill(),
                        i.stroke(),
                        i.beginPath(),
                        i.moveTo(-.55, 0),
                        i.lineTo(.15, 0),
                        i.moveTo(.3, -.35),
                        i.quadraticCurveTo(.15, 0, .3, .35),
                        i.moveTo(-.45, .225),
                        i.quadraticCurveTo(-.3, .35, 0, .4),
                        i.moveTo(-.45, -.225),
                        i.quadraticCurveTo(-.3, -.35, 0, -.4),
                        i.stroke(),
                        h(i, o, .125),
                        i.beginPath(),
                        i.moveTo(.85, .16),
                        i.quadraticCurveTo(1.36, .18, 1.68, .49),
                        i.quadraticCurveTo(1.26, .3, .85, .16),
                        i.moveTo(.85, -.16),
                        i.quadraticCurveTo(1.36, -.18, 1.68, -.49),
                        i.quadraticCurveTo(1.26, -.3, .85, -.16),
                        i.closePath(),
                        i.fill(),
                        i.stroke()
                    }
                    const Ne = new Path2D("M.96-.33C.72-.6-.91-.83-.84-.33Q-1.04 0-.84.33C-.91.83.72.6.96.33L.8.27A.03.03 90 11.8-.27Z");
                    function Qe(e=!1, t=n.ej) {
                        t.save(),
                        t.scale(1.334, 1.334),
                        h(t, (0,
                        n.Lh)(s.Tj.peaGreen, "#FF0000", .5 * e), .1),
                        t.beginPath(),
                        t.arc(.6, 0, .325, 0, c),
                        t.closePath(),
                        t.fill(),
                        t.stroke(),
                        t.fillStyle = t.strokeStyle,
                        t.beginPath(),
                        t.arc(.7, -.08, .07, 0, c),
                        t.arc(.7, .08, .07, 0, c),
                        t.closePath(),
                        t.fill(),
                        h(t, (0,
                        n.Lh)(s.Tj.spider, "#FF0000", .5 * e), .1),
                        t.fill(Ne),
                        t.stroke(Ne),
                        t.beginPath(),
                        t.moveTo(.65, -.35),
                        t.bezierCurveTo(.65, -.35, -.05, -.45, -.6, -.1),
                        t.moveTo(.65, .35),
                        t.bezierCurveTo(.65, .35, -.05, .45, -.6, .1),
                        t.moveTo(-.475, -.4),
                        t.bezierCurveTo(-.475, -.4, -.8, -.2, -.7, -.1),
                        t.moveTo(-.475, .4),
                        t.bezierCurveTo(-.475, .4, -.8, .2, -.7, .1),
                        t.moveTo(.475, -.25),
                        t.bezierCurveTo(.475, -.25, .375, 0, .4, .25),
                        t.moveTo(.275, -.2),
                        t.bezierCurveTo(.2, -.2, .175, 0, .275, .2),
                        t.moveTo(.1, 0),
                        t.bezierCurveTo(-.2, -.1, -.4, .1, -.6, 0),
                        t.stroke(),
                        t.closePath(),
                        t.restore()
                    }
                    function Xe(e, t, a=!1, i=!1, o=n.ej) {
                        const s = performance.now() * (a ? .0075 : .0025) + e / 3
                          , r = (0,
                        n.Lh)(t, "#FF0000", .5 * i);
                        u(o, 6, 1, s),
                        o.fillStyle = o.strokeStyle = r,
                        o.lineWidth = .25,
                        o.fill(),
                        o.stroke(),
                        u(o, 6, .667, .8 * -s),
                        o.fillStyle = o.strokeStyle = (0,
                        n.Lh)(r, "#000000", .2),
                        o.lineWidth = .25,
                        o.fill(),
                        o.stroke(),
                        u(o, 6, .334, .6 * s),
                        o.fillStyle = o.strokeStyle = (0,
                        n.Lh)(r, "#000000", .4),
                        o.lineWidth = .25,
                        o.fill(),
                        o.stroke()
                    }
                    function Ve(e, t=!1, a=n.ej) {
                        h(a, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t), .125),
                        a.beginPath();
                        for (let t = 0; t < 3; t++)
                            a.moveTo(.35 - .5 * t, -.2),
                            a.lineTo(.5 - .5 * t - .1 * Math.sin(performance.now() / 400 + e / 6 + t), .75 + .2 * Math.sin(t)),
                            a.moveTo(.35 - .5 * t, .2),
                            a.lineTo(.5 - .5 * t + .1 * Math.sin(performance.now() / 400 + e / 3 + t), -.75 - .2 * Math.sin(t));
                        a.stroke(),
                        a.closePath();
                        const i = .15 * Math.sin(.005 * performance.now() + e / 4) + Math.PI / 10;
                        a.fillStyle = a.strokeStyle,
                        a.save(),
                        a.translate(.6, -.2),
                        a.rotate(i),
                        f(a),
                        a.rotate(-i),
                        a.scale(1, -1),
                        a.translate(0, -.4),
                        a.rotate(i),
                        f(a),
                        a.rotate(-i),
                        a.restore(),
                        h(a, (0,
                        n.Lh)(s.Tj.scorpionBrown, "#FF0000", .5 * t), .125),
                        a.beginPath(),
                        a.moveTo(-1, 0),
                        a.bezierCurveTo(-1, -1.2, 1, -.7, 1, 0),
                        a.bezierCurveTo(1, .7, -1, 1.2, -1, 0),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        a.beginPath(),
                        a.moveTo(.65, -.3),
                        a.quadraticCurveTo(.85, 0, .65, .3),
                        a.moveTo(.3, -.4),
                        a.quadraticCurveTo(.5, 0, .3, .4),
                        a.moveTo(0, -.4),
                        a.quadraticCurveTo(-.15, 0, 0, .4),
                        a.moveTo(-.45, -.5),
                        a.quadraticCurveTo(-.7, 0, -.45, .5),
                        a.stroke(),
                        a.closePath(),
                        a.beginPath(),
                        a.moveTo(-1.2, 0),
                        a.bezierCurveTo(-1.2, -.6, -.25, -.3, -.25, 0),
                        a.bezierCurveTo(-.25, .3, -1.2, .6, -1.2, 0),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        a.lineWidth = .1,
                        a.beginPath(),
                        a.moveTo(-1, -.125),
                        a.quadraticCurveTo(-1.1, 0, -1, .125),
                        a.moveTo(-.65, -.175),
                        a.quadraticCurveTo(-.85, 0, -.65, .175),
                        a.stroke(),
                        a.closePath(),
                        h(a, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t), .1),
                        a.beginPath(),
                        a.moveTo(-.1, 0),
                        a.lineTo(-.35, -.15),
                        a.lineTo(-.35, .15),
                        a.closePath(),
                        a.fill(),
                        a.stroke()
                    }
                    function Ye(e, t=!1, a=n.ej, i=!1) {
                        a.strokeStyle = (0,
                        n.Lh)(s.Tj.lighterBlack, "#FF0000", .5 * t),
                        a.lineWidth = .2,
                        a.beginPath();
                        for (let t = 0; t < 4; t++) {
                            const o = .52 * t - .79 + .2 * Math.cos(performance.now() * (.001 + .005 * i) + t + e / 3);
                            a.rotate(o),
                            a.moveTo(-.1, -.9),
                            a.quadraticCurveTo(.1, -.9, -.1, 0),
                            a.quadraticCurveTo(.1, .9, -.1, .9),
                            a.rotate(-o)
                        }
                        a.stroke(),
                        a.closePath(),
                        h(a, (0,
                        n.Lh)(s.Tj.honeyGold, "#FF0000", .5 * t), .05),
                        a.beginPath(),
                        a.arc(.7, 0, .35, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        h(a, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t), .1),
                        a.beginPath(),
                        a.moveTo(.9, .15),
                        a.quadraticCurveTo(i ? .8 : 1, 0, .9, -.15),
                        a.stroke(),
                        h(a, (0,
                        n.Lh)(s.Tj.hellMobColor, "#FF0000", .5 * t), .125),
                        a.beginPath(),
                        a.moveTo(.8, .3),
                        a.bezierCurveTo(.7, 1, -1, 1, -1, 0),
                        a.bezierCurveTo(-1, -1, .7, -1, .8, -.3),
                        a.quadraticCurveTo(.7, 0, .8, .3),
                        a.fill(),
                        a.stroke(),
                        a.closePath(),
                        a.beginPath(),
                        a.moveTo(-.667, -.025),
                        a.quadraticCurveTo(.1, .1 * Math.sin(3 * e + performance.now() / 534), .334, -.025),
                        a.stroke(),
                        a.closePath(),
                        a.beginPath(),
                        a.arc(-.45, -.3, .15, 0, c),
                        a.arc(0, -.3, .15, 0, c),
                        a.arc(.45, -.3, .15, 0, c),
                        a.moveTo(-.45, .3),
                        a.arc(-.45, .3, .15, 0, c),
                        a.arc(0, .3, .15, 0, c),
                        a.arc(.45, .3, .15, 0, c),
                        a.fillStyle = a.strokeStyle,
                        a.fill()
                    }
                    function $e(e, t=!1, a=!1, i=n.ej) {
                        h(i, (0,
                        n.Lh)(s.Tj.jellyfish, "#FF0000", .5 * a), .125),
                        i.beginPath(),
                        i.arc(0, 0, 1, 0, c),
                        i.closePath(),
                        i.globalAlpha = .5,
                        i.fill(),
                        i.globalAlpha = 1,
                        i.stroke();
                        const o = (.00125 * performance.now() + e / 4) * (2 * t + 1);
                        for (let e = 0; e < 8; e++) {
                            i.rotate(c / 8 * e);
                            const t = .3 * Math.sin(o * (1 + e / 8)) * (1 - e % 2 * .2);
                            i.beginPath(),
                            i.moveTo(.8, 0),
                            i.lineTo(1.6, t),
                            i.closePath(),
                            i.stroke(),
                            i.rotate(-c / 8 * e)
                        }
                    }
                    const Ke = [7, 9, 12, 16, 24, 28, 32, 32, 32, 38, 38, 40];
                    function Je(e, t=!1, a=n.ej) {
                        const i = Ke[e];
                        h(a, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t), .1),
                        a.beginPath();
                        for (let e = 0; e < i; e++) {
                            const t = c / i * e;
                            a.save(),
                            a.translate(.925 * Math.cos(t), .925 * Math.sin(t)),
                            a.rotate(t),
                            a.moveTo(.2, 0),
                            a.lineTo(0, -.1),
                            a.lineTo(0, .1),
                            a.lineTo(.2, 0),
                            a.restore()
                        }
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        h(a, (0,
                        n.Lh)(s.Tj.cactusGreen, "#FF0000", .5 * t), .1),
                        d(a, i, 1, i / 24 * 6),
                        a.fill(),
                        a.stroke()
                    }
                    function Ze(e, t, a, i, o, s=!1, r=n.ej) {
                        r.save(),
                        r.strokeStyle = (0,
                        n.Lh)("#2A2A2A", "#FF0000", .5 * s),
                        r.lineWidth = .5,
                        r.translate(e, t),
                        r.scale(a, a);
                        const l = .075 * Math.sin(performance.now() * o + i / 4);
                        r.beginPath(),
                        r.moveTo(0, -.7),
                        r.rotate(-l),
                        r.quadraticCurveTo(1.25, -.5, 1.5, -.4),
                        r.closePath(),
                        r.stroke(),
                        r.rotate(l),
                        r.beginPath(),
                        r.moveTo(0, .7),
                        r.rotate(l),
                        r.quadraticCurveTo(1.25, .5, 1.5, .4),
                        r.closePath(),
                        r.stroke(),
                        r.restore(),
                        r.beginPath(),
                        r.arc(e, t, a, 0, c),
                        r.closePath(),
                        r.fill(),
                        r.stroke()
                    }
                    function et(e, t, a, i, o, s=!1, r=n.ej) {
                        r.save(),
                        r.strokeStyle = (0,
                        n.Lh)("#2A2A2A", "#FF0000", .5 * s),
                        r.lineWidth = .5,
                        r.translate(e, t),
                        r.scale(a, a);
                        const l = .075 * Math.sin(performance.now() * o + i / 4);
                        r.beginPath(),
                        r.moveTo(0, -.7),
                        r.rotate(-l),
                        r.lineTo(1.25, -.5),
                        r.lineTo(1.5, -.25),
                        r.closePath(),
                        r.stroke(),
                        r.rotate(l),
                        r.beginPath(),
                        r.moveTo(0, .7),
                        r.rotate(l),
                        r.lineTo(1.25, .5),
                        r.lineTo(1.5, .25),
                        r.closePath(),
                        r.stroke(),
                        r.restore(),
                        r.beginPath(),
                        r.arc(e, t, a, 0, c),
                        r.closePath(),
                        r.fill(),
                        r.stroke()
                    }
                    function tt(e, t, a, i, o, s=!1, r=n.ej) {
                        const l = .3 * Math.sin(performance.now() * o + i / 5) + Math.PI / 10;
                        r.save(),
                        r.globalAlpha = .5,
                        r.translate(e, t),
                        r.scale(a, a),
                        r.fillStyle = (0,
                        n.Lh)("#9FA0A0", "#FF0000", .5 * s),
                        r.beginPath(),
                        r.rotate(l),
                        r.ellipse(0, -.3, 1.35, .5, 0, 0, c),
                        r.rotate(2 * -l),
                        r.ellipse(0, .3, 1.35, .5, 0, 0, c),
                        r.closePath(),
                        r.fill(),
                        r.restore()
                    }
                    function at(e, t, a=!1, i=!1, o=n.ej) {
                        h(o, (0,
                        n.Lh)(t, "#FF0000", .5 * i), .4),
                        Ze(0, 0, 1, e, .005 + .0025 * a, i, o)
                    }
                    function it(e, t, a=!1, i=!1, o=n.ej) {
                        h(o, (0,
                        n.Lh)(t, "#FF0000", .5 * i), .4),
                        o.beginPath(),
                        o.arc(-1.1, 0, .667, 0, c),
                        o.closePath(),
                        o.fill(),
                        o.stroke(),
                        Ze(0, 0, 1, e, .005 + .003 * a, i, o)
                    }
                    function ot(e, t, a=!1, i=!1, o=n.ej) {
                        h(o, (0,
                        n.Lh)(t, "#FF0000", .5 * i), .4),
                        o.beginPath(),
                        o.arc(-1.1, 0, .667, 0, c),
                        o.closePath(),
                        o.fill(),
                        o.stroke(),
                        tt(-.667, 0, 1.25, e, .002 + .0025 * a, i, o),
                        Ze(0, 0, 1, e, .005 + .0035 * a, i, o)
                    }
                    function nt(e, t, a=!1, i=!1, o=n.ej) {
                        h(o, (0,
                        n.Lh)(t, "#FF0000", .5 * i), .4),
                        o.beginPath(),
                        o.arc(-2, 0, 1.3, 0, c),
                        o.arc(-1.1, 0, 1.15, 0, c),
                        o.closePath(),
                        o.fill(),
                        o.stroke(),
                        tt(-.667, 0, 1.25, e, .002 + .003 * a, i, o),
                        Ze(0, 0, 1, e, .005 + .004 * a, i, o)
                    }
                    function st(e, t=!1, a=n.ej) {
                        a.fillStyle = (0,
                        n.Lh)(e, "#FF0000", .5 * t),
                        a.beginPath(),
                        a.arc(0, 0, 1, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.fillStyle = (0,
                        n.Lh)(a.fillStyle, "#000000", .2),
                        a.beginPath(),
                        a.arc(0, 0, .75, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.fillStyle = (0,
                        n.Lh)(a.fillStyle, "#000000", .25),
                        a.beginPath(),
                        a.arc(0, 0, .5, 0, c),
                        a.closePath(),
                        a.fill()
                    }
                    function rt(e, t, a, i=n.ej) {
                        at(e, s.Tj.ants, t, a, i)
                    }
                    function lt(e, t, a, i=n.ej) {
                        it(e, s.Tj.ants, t, a, i)
                    }
                    function ct(e, t, a, i=n.ej, o=!1) {
                        ot(e, o ? s.Tj.playerYellow : s.Tj.ants, t, a, i)
                    }
                    function ht(e, t, a, i=n.ej) {
                        nt(e, s.Tj.ants, t, a, i)
                    }
                    function dt(e, t=n.ej) {
                        st(s.Tj.antHole, e, t)
                    }
                    function ut(e, t, a, i=n.ej) {
                        at(e, s.Tj.fireAnt, t, a, i)
                    }
                    function gt(e, t, a, i=n.ej) {
                        it(e, s.Tj.fireAnt, t, a, i)
                    }
                    function ft(e, t, a, i=n.ej) {
                        ot(e, s.Tj.fireAnt, t, a, i)
                    }
                    function mt(e, t, a, i=n.ej) {
                        nt(e, s.Tj.fireAnt, t, a, i)
                    }
                    function Tt(e, t=n.ej) {
                        st(s.Tj.fireAnt, e, t)
                    }
                    function bt(e, t=n.ej) {
                        h(t, (0,
                        n.Lh)(s.Tj.scorpionBrown, "#FF0000", .5 * e), .4),
                        t.beginPath();
                        for (let e = 0; e < 7; e++) {
                            const a = c / 7 * e
                              , i = .6 * Math.cos(a)
                              , o = .6 * Math.sin(a);
                            t.moveTo(i, o),
                            t.arc(i, o, .5, 0, c)
                        }
                        t.fill(),
                        t.stroke(),
                        st(s.Tj.termite, e, t)
                    }
                    function kt(e, t=!1, a=!1, i=n.ej) {
                        h(i, (0,
                        n.Lh)(s.Tj.termite, "#FF0000", .5 * a), .4),
                        et(0, 0, 1, e, .005 + .0025 * t, a, i)
                    }
                    function pt(e, t=!1, a=!1, i=n.ej) {
                        h(i, (0,
                        n.Lh)(s.Tj.termite, "#FF0000", .5 * a), .4),
                        i.beginPath(),
                        i.arc(-1.1, 0, .667, 0, c),
                        i.closePath(),
                        i.fill(),
                        i.stroke(),
                        et(0, 0, 1, e, .005 + .003 * t, a, i)
                    }
                    function Ft(e, t=!1, a=!1, i=n.ej) {
                        h(i, (0,
                        n.Lh)(s.Tj.termite, "#FF0000", .5 * a), .4),
                        i.beginPath(),
                        i.arc(-1.1, 0, .667, 0, c),
                        i.closePath(),
                        i.fill(),
                        i.stroke(),
                        tt(-.667, 0, 1.25, e, .002 + .0025 * t, a, i),
                        et(0, 0, 1, e, .005 + .0035 * t, a, i)
                    }
                    function wt(e, t=!1, a=!1, i=n.ej) {
                        i.save(),
                        i.strokeStyle = (0,
                        n.Lh)("#2A2A2A", "#FF0000", .5 * a),
                        i.lineWidth = .2;
                        const o = .05 * Math.sin(performance.now() * (.001 + .005 * t) + e / 4);
                        i.beginPath(),
                        i.moveTo(0, -.3),
                        i.rotate(-o),
                        i.lineTo(1.14, -.2),
                        i.closePath(),
                        i.stroke(),
                        i.rotate(o),
                        i.beginPath(),
                        i.moveTo(0, .3),
                        i.rotate(o),
                        i.lineTo(1.14, .2),
                        i.closePath(),
                        i.stroke(),
                        i.restore(),
                        h(i, (0,
                        n.Lh)(s.Tj.termite, "#FF0000", .5 * a), .2),
                        i.beginPath(),
                        i.arc(0, 0, 1, 0, c),
                        i.closePath(),
                        i.fill(),
                        i.stroke()
                    }
                    function yt(e, t=!1, a=n.ej) {
                        h(a, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t), .2),
                        a.beginPath(),
                        a.arc(0, -.875, .375, 0, c),
                        a.arc(0, .875, .375, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        h(a, (0,
                        n.Lh)(e, "#FF0000", .5 * t), .2),
                        a.beginPath(),
                        a.arc(0, 0, 1, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.stroke()
                    }
                    function vt(e, t, a=!1, i=n.ej) {
                        yt(t, a, i);
                        const o = .1 * Math.sin(.005 * performance.now() + e / 6);
                        h(i, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * a), .2),
                        i.beginPath(),
                        i.moveTo(.75, -.2),
                        i.quadraticCurveTo(1.2, -.3 - o, 1.3, -.5 - o),
                        i.moveTo(.75, .2),
                        i.quadraticCurveTo(1.2, .3 + o, 1.3, .5 + o),
                        i.stroke(),
                        i.closePath()
                    }
                    function Pt(e=!1, t=n.ej) {
                        h(t, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * e), .1),
                        t.beginPath(),
                        t.arc(0, 0, 1, 0, c),
                        t.closePath(),
                        t.fill(),
                        t.stroke()
                    }
                    const jt = [s.Tj.peach, s.Tj.rosePink, s.Tj.sandGold, s.Tj.diepPentagon]
                      , Ct = c / 30;
                    function Mt(e, t=!1, a=n.ej) {
                        a.save(),
                        h(a, (0,
                        n.Lh)(jt[e % 4], "#FF0000", .5 * t), .1),
                        a.scale(1.1, 1.1),
                        a.beginPath();
                        for (let e = 0; e < 15; e++) {
                            const t = e * c / 15
                              , i = t + Ct;
                            if (0 === e) {
                                const e = t - Ct;
                                a.moveTo(.725 * Math.cos(e), .725 * Math.sin(e))
                            }
                            a.quadraticCurveTo(Math.cos(t), Math.sin(t), .725 * Math.cos(i), .725 * Math.sin(i))
                        }
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        a.fillStyle = a.strokeStyle;
                        for (let e = 0; e < 5; e++) {
                            const t = e * c / 5;
                            a.beginPath(),
                            a.arc(.5 * Math.cos(t), .5 * Math.sin(t), .15, 0, c),
                            a.closePath(),
                            a.fill(),
                            a.beginPath(),
                            a.arc(.25 * Math.cos(t), .25 * Math.sin(t), .1, 0, c),
                            a.closePath(),
                            a.fill(),
                            a.beginPath(),
                            a.arc(.1 * Math.cos(t), .1 * Math.sin(t), .05, 0, c),
                            a.closePath(),
                            a.fill()
                        }
                        a.restore()
                    }
                    function St(e=!1, t=n.ej) {
                        h(t, (0,
                        n.Lh)(s.Tj.white, "#FF0000", .5 * e), .085),
                        t.beginPath(),
                        t.arc(0, 0, 1, 0, c),
                        t.closePath(),
                        t.globalAlpha = .2,
                        t.fill(),
                        t.globalAlpha = .8,
                        t.stroke(),
                        t.fillStyle = (0,
                        n.Lh)(s.Tj.bubbleGrey, "#FF0000", .5 * e),
                        t.beginPath(),
                        t.arc(.25, -.25, .25, 0, c),
                        t.closePath(),
                        t.fill(),
                        t.globalAlpha = 1
                    }
                    function xt(e=!1, t=n.ej) {
                        h(t, (0,
                        n.Lh)(s.Tj.peach, "#FF0000", .5 * e), .125);
                        const a = t.fillStyle;
                        t.fillStyle = t.strokeStyle,
                        t.beginPath(),
                        t.moveTo(0, 0),
                        t.lineTo(-.95, -.6),
                        t.quadraticCurveTo(-.85, 0, -.95, .6),
                        t.closePath(),
                        t.fill(),
                        t.stroke(),
                        t.fillStyle = a,
                        t.beginPath(),
                        t.moveTo(.3, -.95),
                        t.quadraticCurveTo(1.5, 0, .3, .95),
                        t.lineTo(-.8, .3),
                        t.quadraticCurveTo(-1, 0, -.8, -.3),
                        t.closePath(),
                        t.fill(),
                        t.stroke(),
                        t.beginPath(),
                        t.moveTo(-.6, -.15),
                        t.lineTo(.3, -.7),
                        t.moveTo(-.4, -.085),
                        t.lineTo(.4, -.3),
                        t.moveTo(-.4, .085),
                        t.lineTo(.4, .3),
                        t.moveTo(-.6, .15),
                        t.lineTo(.3, .7),
                        t.stroke(),
                        t.closePath()
                    }
                    class At {
                        constructor() {
                            this.legs = [1, 1, 1, 1, 1],
                            this.legGoals = [1, 1, 1, 1, 1],
                            this.livingCount = 5
                        }
                        update(e) {
                            let t = e / .2 + .5 | 0;
                            t > this.livingCount && this.revive(),
                            t < this.livingCount && this.kill();
                            for (let e = 0; e < this.legs.length; e++)
                                this.legs[e] !== this.legGoals[e] && (this.legs[e] += (this.legGoals[e] - this.legs[e]) / 10)
                        }
                        revive() {
                            if (5 === this.livingCount)
                                return;
                            const e = [0, 1, 2, 3, 4].sort(( () => Math.random() - .5));
                            for (let t = 0; t < e.length; t++)
                                if (0 === this.legGoals[e[t]])
                                    return this.legGoals[e[t]] = 1,
                                    void this.livingCount++
                        }
                        kill() {
                            if (0 === this.livingCount)
                                return;
                            const e = [0, 1, 2, 3, 4].sort(( () => Math.random() - .5));
                            for (let t = 0; t < e.length; t++)
                                if (1 === this.legGoals[e[t]])
                                    return this.legGoals[e[t]] = 0,
                                    void this.livingCount--
                        }
                    }
                    function Et(e=!1, t=n.ej, a) {
                        h(t, (0,
                        n.Lh)(s.Tj.starfish, "#FF0000", .5 * e), .125),
                        t.beginPath();
                        for (let e = 0; e < 5; e++) {
                            const i = c / 5 * e
                              , o = 1 + .6 * a.legs[e];
                            if (0 === e) {
                                const e = 1 + .6 * a.legs[4]
                                  , o = 1.675 + .125 * a.legs[4];
                                t.moveTo(Math.cos(i - c / 10 * o) * e, Math.sin(i - c / 10 * o) * e)
                            }
                            t.quadraticCurveTo(.4 * Math.cos(i - c / 10), .4 * Math.sin(i - c / 10), Math.cos(i) * o + .2 * Math.cos(i - Math.PI / 2), Math.sin(i) * o + .2 * Math.sin(i - Math.PI / 2)),
                            t.arc(Math.cos(i) * o, Math.sin(i) * o, .2, i - Math.PI / 2, i + Math.PI / 2)
                        }
                        t.fill(),
                        t.stroke(),
                        t.closePath(),
                        t.fillStyle = (0,
                        n.Lh)(t.fillStyle, s.Tj.white, .3);
                        for (let e = 0; e < 5; e++) {
                            const i = c / 5 * e
                              , o = a.legs[e] > .5
                              , n = Math.cos(i)
                              , s = Math.sin(i);
                            t.beginPath(),
                            t.arc(.4 * n, .4 * s, .15, 0, c),
                            t.moveTo(.9 * n, .9 * s),
                            t.arc(.9 * n, .9 * s, .125, 0, c),
                            o && (t.moveTo(1.4 * n, 1.4 * s),
                            t.arc(1.4 * n, 1.4 * s, .1125, 0, c)),
                            t.fill(),
                            t.closePath()
                        }
                    }
                    function Lt(e=!1, t=n.ej, a=[], i, o=!1, r, l=!1) {
                        const c = (0,
                        n.Lh)(l ? s.Tj.playerYellow : s.Tj.lighterBlack, "#FF0000", .5 * e)
                          , h = (0,
                        n.Lh)(c, "#000000", .2);
                        t.lineCap = "round",
                        t.lineJoin = "round";
                        const d = o ? .0075 : .0025
                          , u = .075 * Math.sin(performance.now() * d + r / 4) - Math.PI / 10;
                        t.strokeStyle = h,
                        t.lineWidth = .3,
                        t.save(),
                        t.beginPath(),
                        t.moveTo(0, -.8),
                        t.rotate(-u),
                        t.quadraticCurveTo(1.15, -1, 1.3, -.8),
                        t.stroke(),
                        t.closePath(),
                        t.rotate(u),
                        t.beginPath(),
                        t.moveTo(0, .8),
                        t.rotate(u),
                        t.quadraticCurveTo(1.15, 1, 1.3, .8),
                        t.stroke(),
                        t.closePath(),
                        t.restore(),
                        t.beginPath(),
                        t.moveTo(0, 0),
                        t.rotate(-i),
                        a.forEach((e => {
                            t.lineTo(e.x, e.y)
                        }
                        )),
                        t.rotate(i),
                        t.strokeStyle = h,
                        t.lineWidth = 2,
                        t.stroke(),
                        t.strokeStyle = c,
                        t.lineWidth = 1.5,
                        t.stroke()
                    }
                    function It(e, t, a, i, o, s=!1, r=n.ej) {
                        const l = .3 * Math.sin(performance.now() * o + i / 5) + Math.PI / 10;
                        r.save(),
                        r.globalAlpha = .5,
                        r.translate(e, t),
                        r.scale(a, a),
                        r.fillStyle = (0,
                        n.Lh)("#9FA0A0", "#FF0000", .5 * s),
                        r.beginPath(),
                        r.rotate(l),
                        r.moveTo(0, -.25),
                        r.ellipse(-.55, -.25, .675, .4, 0, 0, c),
                        r.rotate(2 * -l),
                        r.moveTo(0, .52),
                        r.ellipse(-.55, .25, .675, .4, 0, 0, c),
                        r.closePath(),
                        r.fill(),
                        r.restore()
                    }
                    function Dt(e, t=!1, a=!1, i=n.ej) {
                        h(i, (0,
                        n.Lh)(s.Tj.ants, "#FF0000", .5 * a), .2),
                        i.beginPath(),
                        i.arc(0, 0, 1, 0, c),
                        i.closePath(),
                        i.fill(),
                        i.stroke(),
                        It(-.25, 0, 1.25, e, .0025 + .0125 * t, a, i)
                    }
                    function qt(e, t=!1, a=!1, i=n.ej) {
                        h(i, (0,
                        n.Lh)(s.Tj.spider, "#FF0000", .5 * a), .2),
                        i.beginPath(),
                        i.arc(0, 0, 1, 0, c),
                        i.closePath(),
                        i.fill(),
                        i.stroke(),
                        It(-.25, 0, 1.25, e, .0025 + .0125 * t, a, i);
                        const o = 1 + .1 * Math.sin(.0025 * performance.now() * (1 + 1.5 * t) + .2 * e);
                        h(i, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * a), .15),
                        i.beginPath(),
                        i.moveTo(.75, -.3),
                        i.quadraticCurveTo(1.3, -.35, 1.45, -.65 * o),
                        i.moveTo(.75, .3),
                        i.quadraticCurveTo(1.3, .35, 1.45, .65 * o),
                        i.stroke(),
                        i.beginPath(),
                        i.arc(1.45, -.65 * o, .2, 0, c),
                        i.arc(1.45, .65 * o, .2, 0, c),
                        i.closePath(),
                        i.fill()
                    }
                    function Rt(e=!1, t=n.ej) {
                        h(t, (0,
                        n.Lh)(s.Tj.peach, "#FF0000", .5 * e), .2),
                        t.beginPath(),
                        t.arc(-.4, .2, .25, 0, c),
                        t.arc(-.4, -.2, .25, 0, c),
                        t.closePath(),
                        t.fill(),
                        t.stroke(),
                        h(t, (0,
                        n.Lh)(s.Tj.cumWhite, "#FF0000", .5 * e), .2),
                        t.beginPath(),
                        t.ellipse(0, 0, 1, .7, 0, 3 * Math.PI / 4, 5 * Math.PI / 4, !0),
                        t.quadraticCurveTo(0, -.2, 0, 0),
                        t.quadraticCurveTo(0, .2, -.6, .45),
                        t.closePath(),
                        t.fill(),
                        t.stroke(),
                        t.beginPath(),
                        t.moveTo(0, .45),
                        t.quadraticCurveTo(.5, 0, 0, -.45),
                        t.stroke(),
                        t.closePath(),
                        t.fillStyle = t.strokeStyle,
                        t.beginPath(),
                        t.arc(.65, .15, .15, 0, c),
                        t.arc(.65, -.15, .15, 0, c),
                        t.closePath(),
                        t.fill()
                    }
                    function Ut(e, t=!1, a=n.ej) {
                        h(a, (0,
                        n.Lh)(s.Tj.fireFlyLight, "#FF0000", .5 * t), .125),
                        a.beginPath(),
                        a.ellipse(-1.25, 0, 1.25, .9375, 0, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        h(a, (0,
                        n.Lh)(s.Tj.fireFlyLight, "#FF0000", .5 * t), .125),
                        a.beginPath(),
                        a.arc(-1.25, 0, .625, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        It(-.3125, 0, 1.5625, e, .0025, t, a),
                        h(a, (0,
                        n.Lh)(s.Tj.ants, "#FF0000", .5 * t), .2),
                        a.beginPath(),
                        a.arc(0, 0, 1, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.stroke()
                    }
                    function Bt(e, t=!1, a=n.ej) {
                        h(a, (0,
                        n.Lh)(s.Tj.honeyGold, "#FF0000", .5 * t), .2),
                        a.beginPath(),
                        a.ellipse(0, 0, 1, .8, 0, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.save(),
                        a.clip(),
                        a.beginPath(),
                        a.rect(-1, -1, .334, 2),
                        a.rect(-.334, -1, .334, 2),
                        a.rect(.334, -1, .334, 2),
                        a.fillStyle = (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t),
                        a.fill(),
                        a.restore(),
                        a.beginPath(),
                        a.ellipse(0, 0, 1, .8, 0, 0, c),
                        a.closePath(),
                        a.stroke();
                        const i = 1 + .1 * Math.sin(performance.now() / 334 + .2 * e);
                        h(a, (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t), .2),
                        a.beginPath(),
                        a.moveTo(.85, -.15),
                        a.quadraticCurveTo(1.25, -.2, 1.4, -.45 * i),
                        a.moveTo(.85, .15),
                        a.quadraticCurveTo(1.25, .2, 1.4, .45 * i),
                        a.stroke(),
                        a.beginPath(),
                        a.arc(1.4, -.45 * i, .15, 0, c),
                        a.arc(1.4, .45 * i, .15, 0, c),
                        a.closePath(),
                        a.fill()
                    }
                    function zt(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.diepSquare, "#FF0000", .5 * t), .15),
                        u(e, 4, .925, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function Ht(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.diepTriangle, "#FF0000", .5 * t), .15),
                        u(e, 3, .925, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function _t(e=n.ej, t=!1) {
                        h(e, (0,
                        n.Lh)(s.Tj.diepPentagon, "#FF0000", .5 * t), .15),
                        u(e, 5, .925, 0),
                        e.fill(),
                        e.stroke()
                    }
                    function Ot(e, t=!1, a=n.ej, i=!1) {
                        const o = .15 * Math.sin(performance.now() * (.0085 + .0085 * i) + e / 4) + Math.PI / 20;
                        h(a, (0,
                        n.Lh)((0,
                        n.Lh)(s.Tj.stingerBlack, s.Tj.hellMobColor, .25), "#FF0000", .5 * t), .1),
                        a.save(),
                        a.translate(1, -.2),
                        a.rotate(o),
                        a.beginPath(),
                        a.lineTo(-.2805, -.1445),
                        a.quadraticCurveTo(.306, -.374, .6885, -.085),
                        a.quadraticCurveTo(.7905, -.0085, .697, .0765),
                        a.quadraticCurveTo(.3655, 0, -.2125, .204),
                        a.closePath(),
                        a.fill(),
                        a.rotate(-o),
                        a.translate(0, .4),
                        a.rotate(-o),
                        a.beginPath(),
                        a.lineTo(-.2805, .1445),
                        a.quadraticCurveTo(.306, .374, .6885, .085),
                        a.quadraticCurveTo(.7905, .0085, .697, -.0765),
                        a.quadraticCurveTo(.3655, 0, -.2125, -.204),
                        a.closePath(),
                        a.fill(),
                        a.restore(),
                        He(e, s.Tj.hellMobColor, t, a, i)
                    }
                    function Gt(e, t=!1, a=n.ej, i=!1) {
                        const o = .15 * Math.sin(performance.now() * (.0085 + .0085 * i) + e / 4) + Math.PI / 20;
                        h(a, (0,
                        n.Lh)((0,
                        n.Lh)(s.Tj.stingerBlack, s.Tj.hellMobColor, .25), "#FF0000", .5 * t), .1),
                        a.save(),
                        a.translate(.7, -.2),
                        a.rotate(o),
                        a.beginPath(),
                        a.lineTo(-.2805, -.1445),
                        a.quadraticCurveTo(.306, -.374, .6885, -.085),
                        a.quadraticCurveTo(.7905, -.0085, .697, .0765),
                        a.quadraticCurveTo(.3655, 0, -.2125, .204),
                        a.closePath(),
                        a.fill(),
                        a.rotate(-o),
                        a.translate(0, .4),
                        a.rotate(-o),
                        a.beginPath(),
                        a.lineTo(-.2805, .1445),
                        a.quadraticCurveTo(.306, .374, .6885, .085),
                        a.quadraticCurveTo(.7905, .0085, .697, -.0765),
                        a.quadraticCurveTo(.3655, 0, -.2125, -.204),
                        a.closePath(),
                        a.fill(),
                        a.restore(),
                        a.strokeStyle = (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t),
                        a.lineWidth = .4,
                        a.beginPath();
                        for (let t = 0; t < 4; t++) {
                            const o = .52 * t - .79 + .2 * Math.cos(performance.now() * (.0025 + .0125 * i) + t + e / 3);
                            a.rotate(o),
                            a.moveTo(0, -2.2),
                            a.quadraticCurveTo(.2, -1, 0, 0),
                            a.quadraticCurveTo(-.2, 1, 0, 2.2),
                            a.rotate(-o)
                        }
                        a.stroke(),
                        a.closePath(),
                        h(a, (0,
                        n.Lh)(s.Tj.hellMobColor, "#FF0000", .5 * t), .2),
                        a.beginPath(),
                        a.arc(0, 0, 1, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.stroke()
                    }
                    function Wt(e, t=!1, a=n.ej, i=!1) {
                        const o = (0,
                        n.Lh)(s.Tj.hellMobColor, "#FF0000", .5 * t)
                          , r = (0,
                        n.Lh)(s.Tj.stingerBlack, "#FF0000", .5 * t)
                          , l = i ? .03 * Math.sin(performance.now() / 60 + .1 * e) : (performance.now() + 240 * e) % (9e3 + 8 * e) > 8500 + 4 * e ? .025 * Math.sin(performance.now() / 60 + .1 * e) : 0;
                        h(a, o, .1),
                        a.beginPath(),
                        a.moveTo(-1.55, l),
                        a.lineTo(-.25, -.4),
                        a.lineTo(-.25, .4),
                        a.closePath(),
                        a.fill(),
                        a.stroke(),
                        h(a, o, .1),
                        a.beginPath(),
                        a.ellipse(0, 0, 1, .7, 0, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.save(),
                        a.clip(),
                        a.beginPath(),
                        a.rect(-1, -1, .5, 2),
                        a.rect(.1, -1, .4, 2),
                        a.fillStyle = r,
                        a.fill(),
                        a.restore(),
                        a.beginPath(),
                        a.ellipse(0, 0, 1, .667, 0, 0, c),
                        a.closePath(),
                        a.stroke(),
                        h(a, r, .1),
                        a.beginPath(),
                        a.moveTo(.85, .16),
                        a.quadraticCurveTo(1.36, .18, 1.68, .49),
                        a.quadraticCurveTo(1.26, .3, .85, .16),
                        a.moveTo(.85, -.16),
                        a.quadraticCurveTo(1.36, -.18, 1.68, -.49),
                        a.quadraticCurveTo(1.26, -.3, .85, -.16),
                        a.closePath(),
                        a.fill(),
                        a.stroke();
                        const d = .3 * Math.sin(performance.now() * (.0025 + .0125 * i) + e / 5) + Math.PI / 10;
                        a.save(),
                        a.globalAlpha = .5,
                        a.translate(-.25, 0),
                        a.scale(1.25, 1.25),
                        a.fillStyle = (0,
                        n.Lh)("#9FA0A0", "#FF0000", .5 * t),
                        a.beginPath(),
                        a.rotate(d),
                        a.moveTo(-.2, -.3),
                        a.ellipse(-.55, -.25, .7, .4, 0, 0, c),
                        a.rotate(2 * -d),
                        a.moveTo(-.2, .3),
                        a.ellipse(-.55, .25, .7, .4, 0, 0, c),
                        a.closePath(),
                        a.fill(),
                        a.restore()
                    }
                    function Nt(e, t, a, i=!1, o=n.ej, r=!1, l=!1, c=0, h=void 0) {
                        switch (t) {
                        case 0:
                            Re(e, s.Tj.ladybugRed, i, o);
                            break;
                        case 1:
                            Ue(e, a, i, o);
                            break;
                        case 2:
                            Be(e, i, o);
                            break;
                        case 3:
                            ze(e, r, i, o);
                            break;
                        case 4:
                            He(e, l ? s.Tj.playerYellow : s.Tj.beetlePurple, i, o, r);
                            break;
                        case 5:
                            _e(e, r, i, o);
                            break;
                        case 6:
                            Oe(i, o);
                            break;
                        case 7:
                            Ge(e, s.Tj.hornet, s.Tj.stingerBlack, i, o);
                            break;
                        case 8:
                            We(e, r, i, o);
                            break;
                        case 9:
                            Qe(i, o);
                            break;
                        case 10:
                            Xe(e, l ? s.Tj.honeyGold : s.Tj.sand, r, i, o);
                            break;
                        case 11:
                            Ve(e, i, o);
                            break;
                        case 12:
                            Ye(e, i, o, r);
                            break;
                        case 13:
                            $e(e, r, i, o);
                            break;
                        case 14:
                            Je(a, i, o);
                            break;
                        case 15:
                            rt(e, r, i, o);
                            break;
                        case 16:
                            lt(e, r, i, o);
                            break;
                        case 17:
                            ct(e, r, i, o, l);
                            break;
                        case 18:
                            ht(e, r, i, o);
                            break;
                        case 19:
                            dt(i, o);
                            break;
                        case 20:
                            ut(e, r, i, o);
                            break;
                        case 21:
                            gt(e, r, i, o);
                            break;
                        case 22:
                            ft(e, r, i, o);
                            break;
                        case 23:
                            mt(e, r, i, o);
                            break;
                        case 24:
                            Tt(i, o);
                            break;
                        case 25:
                            kt(e, r, i, o);
                            break;
                        case 26:
                            pt(e, r, i, o);
                            break;
                        case 27:
                            Ft(e, r, i, o);
                            break;
                        case 28:
                            wt(e, r, i, o);
                            break;
                        case 29:
                            bt(i, o);
                            break;
                        case 30:
                        case 31:
                            m(o, i, s.Tj.peach);
                            break;
                        case 32:
                        case 33:
                            m(o, i, (0,
                            n.Lh)(s.Tj.peach, s.Tj.fireAnt, .2));
                            break;
                        case 34:
                        case 61:
                            m(o, i, (0,
                            n.Lh)(s.Tj.peach, s.Tj.termite, .5));
                            break;
                        case 35:
                            Re(e, s.Tj.evilLadybugRed, i, o);
                            break;
                        case 36:
                            Re(e, s.Tj.shinyLadybugGold, i, o);
                            break;
                        case 37:
                            Re(e, s.Tj.lightningTeal, i, o);
                            break;
                        case 38:
                            vt(e, s.Tj.peaGreen, i, o);
                            break;
                        case 39:
                            yt(s.Tj.peaGreen, i, o);
                            break;
                        case 40:
                            vt(e, s.Tj.sand, i, o);
                            break;
                        case 41:
                            yt(s.Tj.sand, i, o);
                            break;
                        case 42:
                            vt(e, s.Tj.irisPurple, i, o);
                            break;
                        case 43:
                            yt(s.Tj.irisPurple, i, o);
                            break;
                        case 44:
                            Pt(i, o);
                            break;
                        case 45:
                            Mt(e, i, o);
                            break;
                        case 46:
                            St(i, o);
                            break;
                        case 47:
                            xt(i, o);
                            break;
                        case 48:
                            Et(i, o, h);
                            break;
                        case 49:
                            Lt(i, o, h, c, r, e, l);
                            break;
                        case 50:
                            Rt(i, o);
                            break;
                        case 51:
                            Ut(e, i, o);
                            break;
                        case 52:
                            Bt(e, i, o);
                            break;
                        case 53:
                            qt(e, r, i, o);
                            break;
                        case 54:
                            Dt(e, r, i, o);
                            break;
                        case 55:
                            zt(o, i);
                            break;
                        case 56:
                            Ht(o, i);
                            break;
                        case 57:
                            _t(o, i);
                            break;
                        case 58:
                            Ot(e, i, o, r);
                            break;
                        case 59:
                            Gt(e, i, o, r);
                            break;
                        case 60:
                            Wt(e, i, o, r)
                        }
                    }
                    function Qt(e, t) {
                        const a = o.wk.petalConfigs[e]
                          , i = a.tiers[t];
                        let r = 350
                          , l = 60 + (0,
                        n.R3)(a.description, -1e4, -1e4, 12.5, 330) + 30;
                        l += 17.5 * ((i.health > 0) + (i.damage > 0) + (i.extraHealth > 0) + (i.constantHeal > 0) + (i.count > 1) + (i.damageReduction > 0) + (1 !== i.speedMultiplier) + (0 !== i.extraSize) + (a.extraRadians > 0) + (i.healing > 0) + (void 0 !== a.enemySpeedDebuff) + (void 0 !== i.poison) + (i.extraRange > 0) + (void 0 !== i.spawnable) + (i.extraVision > 0) + 4 * (void 0 !== i.pentagramAbility) + (void 0 !== i.lightning) + (i.extraPickupRange > 0) + (i.healSpit > 0) + (i.damageReflection > 0) + (1 !== i.density) + 2 * (i.deathDefying > 0) + (void 0 !== i.absorbsDamage) + (i.shield > 0) + (void 0 !== i.boost) + (i.healBack > 0) + (i.lightning?.charges > 1));
                        const c = new OffscreenCanvas(700,2 * l)
                          , h = c.getContext("2d");
                        h.lineCap = "round",
                        h.lineJoin = "round",
                        h.scale(2, 2),
                        h.beginPath(),
                        h.roundRect(0, 0, r, l, 17.5),
                        h.globalAlpha = .334,
                        h.fillStyle = "#000000",
                        h.fill(),
                        h.globalAlpha = 1,
                        h.textAlign = "left",
                        h.textBaseline = "top",
                        (0,
                        n.Qq)(a.name, 10, 10, 22.5, "#FFFFFF", h),
                        (0,
                        n.Qq)(o.wk.tiers[t].name, 10, 35, 15, o.wk.tiers[t].color, h);
                        let d = a.wearable ? "🎩" : (a.cooldown / 22.5 * 100 | 0) / 100 + "s ⟳";
                        i.count > 1 && (d = i.count + "x | " + d),
                        i.spawnable?.timer > 0 && (d += " + " + +i.spawnable.timer.toFixed(2) + "s ⚡︎"),
                        void 0 !== i.boost && (d += " + " + +i.boost.delay.toFixed(2) + "s ⚡︎"),
                        h.textAlign = "right",
                        (0,
                        n.Qq)(d, 340, 10, 17.5, "#FFFFFF", h),
                        h.textAlign = "left";
                        let u = 80 + (0,
                        n.R3)(a.description, 10, 60, 12.5, 330, "#FFFFFF", h);
                        if (i.health > 0 && ((0,
                        n.Qq)("Health: " + (0,
                        s.sz)(+i.health.toFixed(2)), 10, u, 15, s.Tj.common, h),
                        u += 17.5),
                        i.damage > 0 && ((0,
                        n.Qq)("Damage: " + (0,
                        s.sz)(+i.damage.toFixed(2)), 10, u, 15, (0,
                        n.Lh)(s.Tj.legendary, "#FFFFFF", .2), h),
                        u += 17.5),
                        i.extraHealth > 0 && ((0,
                        n.Qq)("Extra Health: " + (0,
                        s.sz)(+i.extraHealth.toFixed(2)), 10, u, 15, (0,
                        n.Lh)(s.Tj.epic, "#FFFFFF", .2), h),
                        u += 17.5),
                        i.constantHeal > 0) {
                            let e = 10 + (0,
                            n.Qq)("Constant Heal: " + (0,
                            s.sz)(+i.constantHeal.toFixed(2)), 10, u, 15, (0,
                            n.Lh)(s.Tj.common, "#FFFFFF", .2), h);
                            a.healWhenUnder < 1 && (e += (0,
                            n.Qq)(" (", e, u, 15, s.Tj.bubbleGrey, h),
                            e += (0,
                            n.Qq)("Under " + +(100 * a.healWhenUnder).toFixed(2) + "% HP", e, u, 15, s.Tj.rosePink, h),
                            (0,
                            n.Qq)(")", e, u, 15, s.Tj.bubbleGrey, h)),
                            u += 17.5
                        }
                        if (i.damageReduction > 0 && ((0,
                        n.Qq)("Damage Reduction: -" + (0,
                        s.sz)(+(100 * i.damageReduction).toFixed(2)) + "%", 10, u, 15, (0,
                        n.Lh)(s.Tj.ultra, "#FFFFFF", .2), h),
                        u += 17.5),
                        1 !== i.speedMultiplier && ((0,
                        n.Qq)("Speed: " + (i.speedMultiplier > 1 ? "+" : "") + +(100 * (i.speedMultiplier - 1)).toFixed(2) + "%", 10, u, 15, (0,
                        n.Lh)(s.Tj.mythic, "#FFFFFF", .2), h),
                        u += 17.5),
                        0 !== i.extraSize && ((0,
                        n.Qq)("Extra Size: " + (i.extraSize > 0 ? "+" : "-") + +i.extraSize.toFixed(2), 10, u, 15, (0,
                        n.Lh)(s.Tj.ancient, "#FFFFFF", .2), h),
                        u += 17.5),
                        a.extraRadians > 0 && ((0,
                        n.Qq)("Radians: +" + +a.extraRadians.toFixed(2), 10, u, 15, (0,
                        n.Lh)(s.Tj.super, "#FFFFFF", .2), h),
                        u += 17.5),
                        i.healing > 0 && ((0,
                        n.Qq)("Heal: +" + (0,
                        s.sz)(+i.healing.toFixed(2)), 10, u, 15, s.Tj.rosePink, h),
                        u += 17.5),
                        void 0 !== a.enemySpeedDebuff && ((0,
                        n.Qq)("Speed Debuff: -" + +(100 * (1 - a.enemySpeedDebuff.speedMultiplier)).toFixed(2) + "% for " + (a.enemySpeedDebuff.duration / 22.5).toFixed(2) + "s", 10, u, 15, s.Tj.jellyfish, h),
                        u += 17.5),
                        void 0 !== i.poison && ((0,
                        n.Qq)("Poison: " + (0,
                        s.sz)(+i.poison.damage.toFixed(2)) + "/s for " + (i.poison.duration / 22.5).toFixed(2) + "s", 10, u, 15, s.Tj.irisPurple, h),
                        u += 17.5),
                        i.extraRange > 0 && ((0,
                        n.Qq)("Range: +" + +i.extraRange.toFixed(2), 10, u, 15, s.Tj.orange, h),
                        u += 17.5),
                        void 0 !== i.spawnable) {
                            let e = 10 + (0,
                            n.Qq)("Spawns: ", 10, u, 15, s.Tj.bubbleGrey, h);
                            e += (0,
                            n.Qq)(o.wk.mobConfigs[i.spawnable.index].name, e, u, 15, s.Tj.peaGreen, h),
                            e += (0,
                            n.Qq)(" (", e, u, 15, s.Tj.bubbleGrey, h),
                            e += (0,
                            n.Qq)(o.wk.tiers[i.spawnable.rarity].name, e, u, 15, o.wk.tiers[i.spawnable.rarity].color, h),
                            (0,
                            n.Qq)(")", e, u, 15, s.Tj.bubbleGrey, h),
                            u += 17.5
                        }
                        if (i.extraVision > 0 && ((0,
                        n.Qq)("Vision: +" + +i.extraVision.toFixed(2), 10, u, 15, s.Tj.orange, h),
                        u += 17.5),
                        void 0 !== i.pentagramAbility && ((0,
                        n.Qq)("Spell: " + +(i.pentagramAbility.cooldown / 22.5).toFixed(2) + "s ⚡︎, " + (0,
                        s.sz)(+i.pentagramAbility.range.toFixed(2)) + " range", 10, u, 15, s.Tj.evilLadybugRed, h),
                        u += 17.5,
                        (0,
                        n.Qq)("- Damage: " + (0,
                        s.sz)(+i.pentagramAbility.damage.toFixed(2)), 20, u, 15, (0,
                        n.Lh)(s.Tj.legendary, "#FFFFFF", .2), h),
                        u += 17.5,
                        (0,
                        n.Qq)("- Poison Inflicted: " + (0,
                        s.sz)(+i.pentagramAbility.poison.damage.toFixed(2)) + "/s for " + +i.pentagramAbility.poison.duration.toFixed(2) + "s", 20, u, 15, s.Tj.irisPurple, h),
                        u += 17.5,
                        (0,
                        n.Qq)("- Speed Debuff: " + +(100 * (1 - i.pentagramAbility.speedDebuff.multiplier)).toFixed(2) + "% for " + +i.pentagramAbility.speedDebuff.duration.toFixed(2) + "s", 20, u, 15, s.Tj.jellyfish, h),
                        u += 17.5),
                        void 0 !== i.lightning) {
                            let e = 10 + (0,
                            n.Qq)("Lightning: ", 10, u, 15, s.Tj.lightningTeal, h);
                            e += (0,
                            n.Qq)(i.lightning.bounces + "x, ", e, u, 15, (0,
                            n.Lh)(s.Tj.team1, "#FFFFFF", .4), h),
                            e += (0,
                            n.Qq)((0,
                            s.sz)(+i.lightning.damage.toFixed(2)) + " dmg, ", e, u, 15, (0,
                            n.Lh)(s.Tj.team2, "#FFFFFF", .4), h),
                            e += (0,
                            n.Qq)((0,
                            s.sz)(+i.lightning.range.toFixed(2)) + " range", e, u, 15, (0,
                            n.Lh)(s.Tj.playerYellow, "#FFFFFF", .4), h),
                            u += 17.5
                        }
                        if (i.lightning?.charges > 1 && ((0,
                        n.Qq)("Charges: " + i.lightning.charges, 10, u, 15, (0,
                        n.Lh)(s.Tj.lightningTeal, "#FFFFFF", .4), h),
                        u += 17.5),
                        i.extraPickupRange > 0 && ((0,
                        n.Qq)("Pickup Range: +" + +i.extraPickupRange.toFixed(2), 10, u, 15, (0,
                        n.Lh)(s.Tj.rare, "#FFFFFF", .35), h),
                        u += 17.5),
                        i.healSpit > 0 && ((0,
                        n.Qq)("Team Heal: +" + (0,
                        s.sz)(+i.healSpit.toFixed(2)) + "/nearby teammate", 10, u, 15, s.Tj.rosePink, h),
                        u += 17.5),
                        i.damageReflection > 0 && ((0,
                        n.Qq)("Damage Reflection: " + +(100 * i.damageReflection).toFixed(2) + "%", 10, u, 15, (0,
                        n.Lh)(s.Tj.legendary, "#FFFFFF", .2), h),
                        u += 17.5),
                        1 !== i.density && ((0,
                        n.Qq)("Density: " + +i.density.toFixed(2), 10, u, 15, (0,
                        n.Lh)(s.Tj.epic, "#FFFFFF", .2), h),
                        u += 17.5),
                        i.deathDefying > 0 && ((0,
                        n.Qq)("Resurrection Health: " + +(100 * i.deathDefying).toFixed(2) + "%", 10, u, 15, (0,
                        n.Lh)(s.Tj.mythic, "#FFFFFF", .2), h),
                        (0,
                        n.Qq)("Resurrection Immunity: " + +((1500 + 250 * t) / 1e3).toFixed(2) + "s", 10, u + 17.5, 15, (0,
                        n.Lh)(s.Tj.super, "#FFFFFF", .2), h),
                        u += 35),
                        void 0 !== i.absorbsDamage) {
                            let e = 10 + (0,
                            n.Qq)("Absorption: ", 10, u, 15, (0,
                            n.Lh)(s.Tj.peaGreen, "#FFFFFF", .2), h);
                            e += (0,
                            n.Qq)((0,
                            s.sz)(+i.absorbsDamage.maxDamage.toFixed(2)) + " dmg ", e, u, 15, (0,
                            n.Lh)(s.Tj.legendary, "#FFFFFF", .2), h),
                            e += (0,
                            n.Qq)("over " + +i.absorbsDamage.period.toFixed(2) + "s", e, u, 15, (0,
                            n.Lh)(s.Tj.uncommon, "#FFFFFF", .2), h),
                            u += 17.5
                        }
                        return i.shield > 0 && ((0,
                        n.Qq)("Shield: " + (0,
                        s.sz)(+i.shield.toFixed(2)), 10, u, 15, (0,
                        n.Lh)(s.Tj.mythic, "#FFFFFF", .2), h),
                        u += 17.5),
                        void 0 !== i.boost && ((0,
                        n.Qq)("Boost: " + (0,
                        s.sz)(+i.boost.length.toFixed(2)), 10, u, 15, (0,
                        n.Lh)(s.Tj.rare, "#FFFFFF", .2), h),
                        u += 17.5),
                        i.healBack > 0 && ((0,
                        n.Qq)("Heal Back: " + (0,
                        s.sz)(+(100 * i.healBack).toFixed(2)) + "%", 10, u, 15, s.Tj.inventory, h),
                        u += 17.5),
                        c
                    }
                    const Xt = [];
                    function Vt(e, t) {
                        return Xt[e] || (Xt[e] = []),
                        Xt[e][t] || (Xt[e][t] = Qt(e, t)),
                        Xt[e][t]
                    }
                    const Yt = ( () => {
                        const e = new OffscreenCanvas(256,256)
                          , t = e.getContext("2d");
                        t.translate(128, 128),
                        t.scale(124, 124);
                        const a = new Path2D("M0 1C.551 1 1 .551 1 0c0-.551-.449-1-1-1-.551 0-1 .449-1 1C-1 .551-.551 1 0 1zM0 .867c-.159 0-.308-.043-.436-.118l.431-.328L.436.749C.308.824.159.867 0 .867zM.318.469l-.195-.145L.245.235.318.469zM.283-.171l.261-.003-.215.156L.283-.171zM.034.197l-.04.029-.119-.085-.074-.055.079-.252.238-.002.077.244L.034.197zM-.135.325l-.183.139.07-.222.031.022L-.135.325zM-.333-.009l-.216-.154.263-.003L-.333-.009zM.867 0c0 .272-.126.515-.323.674l-.168-.535.467-.339C.859-.136.867-.069.867 0zM.801-.331l-.564.005-.161-.538C.404-.835.68-.623.801-.331zM-.001-.547l.07.223-.14.001L-.001-.547zM-.077-.864l-.162.543-.568.006C-.69-.615-.411-.834-.077-.864zM-.381.147l-.165.526c-.196-.159-.322-.402-.322-.673 0-.064.007-.126.02-.186L-.381.147z");
                        return t.strokeStyle = "rgba(255, 128, 100, 1)",
                        t.lineWidth = .05,
                        t.stroke(a),
                        (t=n.ej, a=performance.now() % 5e3 / 5e3) => {
                            t.drawImage(e, -1, -1, 2, 2),
                            t.beginPath();
                            for (let e = 0; e < 8; e++) {
                                const i = e / 4 * Math.PI
                                  , o = a * (.05 * Math.sin(5 * e + a * e + performance.now() / 1e3) + 1);
                                t.quadraticCurveTo(Math.cos(i + Math.PI / 8) * o, Math.sin(i + Math.PI / 8) * o, Math.cos(i + Math.PI / 4) * o, Math.sin(i + Math.PI / 4) * o)
                            }
                            t.closePath(),
                            t.strokeStyle = "rgba(255, 128, 100, 1)",
                            t.lineWidth = .075,
                            t.stroke()
                        }
                    }
                    )();
                    i()
                } catch ($t) {
                    i($t)
                }
            }
            ))
        }
        ,
        874: (e, t, a) => {
            a.d(t, {
                Cc: () => o,
                Ho: () => s,
                Tj: () => r,
                UB: () => i,
                fF: () => h,
                nU: () => n,
                sz: () => l,
                t1: () => c
            });
            const i = location.protocol + "//" + ("localhost" === location.hostname || location.hostname.startsWith("10.0.") ? location.hostname + ":80" : "e2.server.eparker.dev");
            function o(e, t, a) {
                return e + (t - e) * a
            }
            function n(e, t, a) {
                const i = (1 - a) * Math.cos(e) + a * Math.cos(t)
                  , o = (1 - a) * Math.sin(e) + a * Math.sin(t);
                return Math.atan2(o, i)
            }
            function s(e) {
                e.classList.add("shake"),
                setTimeout(e.classList.remove.bind(e.classList, "shake"), 500)
            }
            const r = {
                common: "#7EEF6D",
                uncommon: "#FFE65D",
                rare: "#455FCF",
                epic: "#7633CB",
                legendary: "#C13328",
                mythic: "#1ED2CB",
                ultra: "#ff2b75",
                super: "#2affa3",
                ancient: "#ff7b29",
                omega: "#d966e8",
                "???": "#333333",
                unique: "#FFFFFF",
                account: "#7EEF6D",
                absorb: "#895adc",
                skillTree: "#dc5a5a",
                inventory: "#5a9edb",
                settings: "#C8C8C8",
                crafting: "#DB9D5A",
                mobGallery: "#DBD64A",
                team1: "#00B2E1",
                team2: "#F14E54",
                white: "#FFFFFF",
                peach: "#FFF0B7",
                cumWhite: "#ffffC9",
                black: "#000000",
                rosePink: "#FC93C5",
                irisPurple: "#CD75DE",
                pollenGold: "#FEE86B",
                peaGreen: "#8CC05B",
                sandGold: "#DDC758",
                grapePurple: "#C973D8",
                leafGreen: "#3AB54A",
                uraniumLime: "#66BB2A",
                honeyGold: "#F5D230",
                hornet: "#FED263",
                lightningTeal: "#00FFFF",
                rockGray: "#7B727C",
                stingerBlack: "#222222",
                lighterBlack: "#353535",
                cactusGreen: "#39C660",
                cactusLightGreen: "#75D68F",
                bubbleGrey: "#B8B8B8",
                playerYellow: "#FFE763",
                scorpionBrown: "#C69A2D",
                diepSquare: "#ffe46b",
                diepTriangle: "#fc7676",
                diepPentagon: "#768cfc",
                ladybugRed: "#EB4034",
                evilLadybugRed: "#962921",
                shinyLadybugGold: "#ebeb34",
                hellMobColor: "#AA1C1D",
                beeYellow: "#FFE763",
                pincer: "#2a2a2a",
                antHole: "#A8711E",
                ants: "#555555",
                fireAnt: "#a82a01",
                termite: "#d3a35b",
                wasp: "#9f4627",
                jellyfish: "#EFEFEF",
                spider: "#4f412e",
                darkGreen: "#118240",
                beetlePurple: "#915db0",
                roach: "#9D4F23",
                roachHead: "#6C3419",
                fireFlyLight: "#EFDECC",
                sand: "#E1C85D",
                jelly: "#D5B5D3",
                orange: "#F1BC48",
                starfish: "#AA403F",
                book: "#c28043",
                bookSpine: "#c28043"
            };
            function l(e) {
                return e < 1e3 ? e : e < 1e6 ? (e / 1e3).toFixed(1) + "k" : e < 1e9 ? (e / 1e6).toFixed(1) + "m" : (e / 1e9).toFixed(1) + "b"
            }
            function c(e, t) {
                const a = e.x - t.x
                  , i = e.y - t.y;
                return a * a + i * i
            }
            const h = {
                showDebug: !1,
                hideGrid: !1,
                rigidInterpolation: !1,
                mouseMovement: !1,
                hideEntityUI: !1,
                useTileBackground: !1,
                fancyGraphics: !1,
                showHitboxes: !0
            }
        }
    }, n = {};
    function s(e) {
        var t = n[e];
        if (void 0 !== t)
            return t.exports;
        var a = n[e] = {
            exports: {}
        };
        return o[e](a, a.exports, s),
        a.exports
    }
    e = "function" == typeof Symbol ? Symbol("webpack queues") : "__webpack_queues__",
    t = "function" == typeof Symbol ? Symbol("webpack exports") : "__webpack_exports__",
    a = "function" == typeof Symbol ? Symbol("webpack error") : "__webpack_error__",
    i = e => {
        e && e.d < 1 && (e.d = 1,
        e.forEach((e => e.r--)),
        e.forEach((e => e.r-- ? e.r++ : e())))
    }
    ,
    s.a = (o, n, s) => {
        var r;
        s && ((r = []).d = -1);
        var l, c, h, d = new Set, u = o.exports, g = new Promise(( (e, t) => {
            h = t,
            c = e
        }
        ));
        g[t] = u,
        g[e] = e => (r && e(r),
        d.forEach(e),
        g.catch((e => {}
        ))),
        o.exports = g,
        n((o => {
            var n;
            l = (o => o.map((o => {
                if (null !== o && "object" == typeof o) {
                    if (o[e])
                        return o;
                    if (o.then) {
                        var n = [];
                        n.d = 0,
                        o.then((e => {
                            s[t] = e,
                            i(n)
                        }
                        ), (e => {
                            s[a] = e,
                            i(n)
                        }
                        ));
                        var s = {};
                        return s[e] = e => e(n),
                        s
                    }
                }
                var r = {};
                return r[e] = e => {}
                ,
                r[t] = o,
                r
            }
            )))(o);
            var s = () => l.map((e => {
                if (e[a])
                    throw e[a];
                return e[t]
            }
            ))
              , c = new Promise((t => {
                (n = () => t(s)).r = 0;
                var a = e => e !== r && !d.has(e) && (d.add(e),
                e && !e.d && (n.r++,
                e.push(n)));
                l.map((t => t[e](a)))
            }
            ));
            return n.r ? c : s()
        }
        ), (e => (e ? h(g[a] = e) : c(u),
        i(r)))),
        r && r.d < 0 && (r.d = 0)
    }
    ,
    s.d = (e, t) => {
        for (var a in t)
            s.o(t, a) && !s.o(e, a) && Object.defineProperty(e, a, {
                enumerable: !0,
                get: t[a]
            })
    }
    ,
    s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    s(700)
}
)();
