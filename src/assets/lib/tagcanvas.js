/* eslint-disable */
/**
 * Copyright (C) 2010-2015 Graham Breach
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * TagCanvas 2.9
 * For more information, please contact <graham@goat1000.com>
 */
(function() {
	var M, K, L = Math.abs, ah = Math.sin, w = Math.cos, s = Math.max, aD = Math.min, ap = Math.ceil, F = Math.sqrt, at = Math.pow, h = {}, l = {}, m = {
			0: "0,",
			1: "17,",
			2: "34,",
			3: "51,",
			4: "68,",
			5: "85,",
			6: "102,",
			7: "119,",
			8: "136,",
			9: "153,",
			a: "170,",
			A: "170,",
			b: "187,",
			B: "187,",
			c: "204,",
			C: "204,",
			d: "221,",
			D: "221,",
			e: "238,",
			E: "238,",
			f: "255,",
			F: "255,"
	}, x, c, Q, aF, H, aG, aa, C = document, p, b = {};
	for (M = 0; M < 256; ++M) {
			K = M.toString(16);
			if (M < 16) {
					K = "0" + K
			}
			l[K] = l[K.toUpperCase()] = M.toString() + ","
	}
	function ai(i) {
			return typeof i != "undefined"
	}
	function I(i) {
			return typeof i == "object" && i != null
	}
	function av(i, j, aH) {
			return isNaN(i) ? aH : aD(aH, s(j, i))
	}
	function aA() {
			return false
	}
	function G() {
			return new Date().valueOf()
	}
	function A(aH, aK) {
			var j = [], aI = aH.length, aJ;
			for (aJ = 0; aJ < aI; ++aJ) {
					j.push(aH[aJ])
			}
			j.sort(aK);
			return j
	}
	function an(j) {
			var aI = j.length - 1, aH, aJ;
			while (aI) {
					aJ = ~~(Math.random() * aI);
					aH = j[aI];
					j[aI] = j[aJ];
					j[aJ] = aH;
					--aI
			}
	}
	function ae(i, aH, j) {
			this.x = i;
			this.y = aH;
			this.z = j
	}
	H = ae.prototype;
	H.length = function() {
			return F(this.x * this.x + this.y * this.y + this.z * this.z)
	}
	;
	H.dot = function(i) {
			return this.x * i.x + this.y * i.y + this.z * i.z
	}
	;
	H.cross = function(j) {
			var i = this.y * j.z - this.z * j.y
				, aI = this.z * j.x - this.x * j.z
				, aH = this.x * j.y - this.y * j.x;
			return new ae(i,aI,aH)
	}
	;
	H.angle = function(j) {
			var i = this.dot(j), aH;
			if (i == 0) {
					return Math.PI / 2
			}
			aH = i / (this.length() * j.length());
			if (aH >= 1) {
					return 0
			}
			if (aH <= -1) {
					return Math.PI
			}
			return Math.acos(aH)
	}
	;
	H.unit = function() {
			var i = this.length();
			return new ae(this.x / i,this.y / i,this.z / i)
	}
	;
	function aj(aH, j) {
			j = j * Math.PI / 180;
			aH = aH * Math.PI / 180;
			var i = ah(aH) * w(j)
				, aJ = -ah(j)
				, aI = -w(aH) * w(j);
			return new ae(i,aJ,aI)
	}
	function R(i) {
			this[1] = {
					1: i[0],
					2: i[1],
					3: i[2]
			};
			this[2] = {
					1: i[3],
					2: i[4],
					3: i[5]
			};
			this[3] = {
					1: i[6],
					2: i[7],
					3: i[8]
			}
	}
	aF = R.prototype;
	R.Identity = function() {
			return new R([1, 0, 0, 0, 1, 0, 0, 0, 1])
	}
	;
	R.Rotation = function(aI, i) {
			var j = ah(aI)
				, aH = w(aI)
				, aJ = 1 - aH;
			return new R([aH + at(i.x, 2) * aJ, i.x * i.y * aJ - i.z * j, i.x * i.z * aJ + i.y * j, i.y * i.x * aJ + i.z * j, aH + at(i.y, 2) * aJ, i.y * i.z * aJ - i.x * j, i.z * i.x * aJ - i.y * j, i.z * i.y * aJ + i.x * j, aH + at(i.z, 2) * aJ])
	}
	;
	aF.mul = function(aH) {
			var aI = [], aL, aK, aJ = (aH.xform ? 1 : 0);
			for (aL = 1; aL <= 3; ++aL) {
					for (aK = 1; aK <= 3; ++aK) {
							if (aJ) {
									aI.push(this[aL][1] * aH[1][aK] + this[aL][2] * aH[2][aK] + this[aL][3] * aH[3][aK])
							} else {
									aI.push(this[aL][aK] * aH)
							}
					}
			}
			return new R(aI)
	}
	;
	aF.xform = function(aH) {
			var j = {}
				, i = aH.x
				, aJ = aH.y
				, aI = aH.z;
			j.x = i * this[1][1] + aJ * this[2][1] + aI * this[3][1];
			j.y = i * this[1][2] + aJ * this[2][2] + aI * this[3][2];
			j.z = i * this[1][3] + aJ * this[2][3] + aI * this[3][3];
			return j
	}
	;
	function q(aI, aK, aQ, aN, aP) {
			var aL, aO, j, aM, aR = [], aH = 2 / aI, aJ;
			aJ = Math.PI * (3 - F(5) + (parseFloat(aP) ? parseFloat(aP) : 0));
			for (aL = 0; aL < aI; ++aL) {
					aO = aL * aH - 1 + (aH / 2);
					j = F(1 - aO * aO);
					aM = aL * aJ;
					aR.push([w(aM) * j * aK, aO * aQ, ah(aM) * j * aN])
			}
			return aR
	}
	function W(aJ, aH, aM, aT, aQ, aS) {
			var aR, aU = [], aI = 2 / aJ, aK, aP, aO, aN, aL;
			aK = Math.PI * (3 - F(5) + (parseFloat(aS) ? parseFloat(aS) : 0));
			for (aP = 0; aP < aJ; ++aP) {
					aO = aP * aI - 1 + (aI / 2);
					aR = aP * aK;
					aN = w(aR);
					aL = ah(aR);
					aU.push(aH ? [aO * aM, aN * aT, aL * aQ] : [aN * aM, aO * aT, aL * aQ])
			}
			return aU
	}
	function N(aH, aI, aL, aR, aP, aN) {
			var aQ, aS = [], aJ = Math.PI * 2 / aI, aO, aM, aK;
			for (aO = 0; aO < aI; ++aO) {
					aQ = aO * aJ;
					aM = w(aQ);
					aK = ah(aQ);
					aS.push(aH ? [aN * aL, aM * aR, aK * aP] : [aM * aL, aN * aR, aK * aP])
			}
			return aS
	}
	function am(aJ, j, aH, aI, i) {
			return W(aJ, 0, j, aH, aI, i)
	}
	function au(aJ, j, aH, aI, i) {
			return W(aJ, 1, j, aH, aI, i)
	}
	function d(aJ, i, j, aH, aI) {
			aI = isNaN(aI) ? 0 : aI * 1;
			return N(0, aJ, i, j, aH, aI)
	}
	function n(aJ, i, j, aH, aI) {
			aI = isNaN(aI) ? 0 : aI * 1;
			return N(1, aJ, i, j, aH, aI)
	}
	function ao(aH) {
			var j = new Image;
			j.onload = function() {
					var aI = j.width / 2
						, i = j.height / 2;
					aH.centreFunc = function(aN, aK, aL, aJ, aM) {
							aN.setTransform(1, 0, 0, 1, 0, 0);
							aN.globalAlpha = 1;
							aN.drawImage(j, aJ - aI, aM - i)
					}
			}
			;
			j.src = aH.centreImage
	}
	function U(aK, i) {
			var aJ = aK, aI, aH, j = (i * 1).toPrecision(3) + ")";
			if (aK[0] === "#") {
					if (!h[aK]) {
							if (aK.length === 4) {
									h[aK] = "rgba(" + m[aK[1]] + m[aK[2]] + m[aK[3]]
							} else {
									h[aK] = "rgba(" + l[aK.substr(1, 2)] + l[aK.substr(3, 2)] + l[aK.substr(5, 2)]
							}
					}
					aJ = h[aK] + j
			} else {
					if (aK.substr(0, 4) === "rgb(" || aK.substr(0, 4) === "hsl(") {
							aJ = (aK.replace("(", "a(").replace(")", "," + j))
					} else {
							if (aK.substr(0, 5) === "rgba(" || aK.substr(0, 5) === "hsla(") {
									aI = aK.lastIndexOf(",") + 1,
									aH = aK.indexOf(")");
									i *= parseFloat(aK.substring(aI, aH));
									aJ = aK.substr(0, aI) + i.toPrecision(3) + ")"
							}
					}
			}
			return aJ
	}
	function P(i, j) {
			if (window.G_vmlCanvasManager) {
					return null
			}
			var aH = C.createElement("canvas");
			aH.width = i;
			aH.height = j;
			return aH
	}
	function al() {
			var j = P(3, 3), aI, aH;
			if (!j) {
					return false
			}
			aI = j.getContext("2d");
			aI.strokeStyle = "#000";
			aI.shadowColor = "#fff";
			aI.shadowBlur = 3;
			aI.globalAlpha = 0;
			aI.strokeRect(2, 2, 2, 2);
			aI.globalAlpha = 1;
			aH = aI.getImageData(2, 2, 1, 1);
			j = null;
			return (aH.data[0] > 0)
	}
	function ak(aL, j, aK, aJ) {
			var aI = aL.createLinearGradient(0, 0, j, 0), aH;
			for (aH in aJ) {
					aI.addColorStop(1 - aH, aJ[aH])
			}
			aL.fillStyle = aI;
			aL.fillRect(0, aK, j, 1)
	}
	function k(aJ, aH, j) {
			var aI = 1024, aN = 1, aM = aJ.weightGradient, aL, aP, aK, aO;
			if (aJ.gCanvas) {
					aP = aJ.gCanvas.getContext("2d");
					aN = aJ.gCanvas.height
			} else {
					if (I(aM[0])) {
							aN = aM.length
					} else {
							aM = [aM]
					}
					aJ.gCanvas = aL = P(aI, aN);
					if (!aL) {
							return null
					}
					aP = aL.getContext("2d");
					for (aK = 0; aK < aN; ++aK) {
							ak(aP, aI, aK, aM[aK])
					}
			}
			j = s(aD(j || 0, aN - 1), 0);
			aO = aP.getImageData(~~((aI - 1) * aH), j, 1, 1).data;
			return "rgba(" + aO[0] + "," + aO[1] + "," + aO[2] + "," + (aO[3] / 255) + ")"
	}
	function X(aQ, aJ, j, aU, aT, aR, aP, aL, aI, aS, aK, aO) {
			var aN = aT + (aL || 0) + (aI.length && aI[0] < 0 ? L(aI[0]) : 0), aH = aR + (aL || 0) + (aI.length && aI[1] < 0 ? L(aI[1]) : 0), aM, aV;
			aQ.font = aJ;
			aQ.textBaseline = "top";
			aQ.fillStyle = j;
			aP && (aQ.shadowColor = aP);
			aL && (aQ.shadowBlur = aL);
			aI.length && (aQ.shadowOffsetX = aI[0],
			aQ.shadowOffsetY = aI[1]);
			for (aM = 0; aM < aU.length; ++aM) {
					aV = 0;
					if (aK) {
							if ("right" == aO) {
									aV = aS - aK[aM]
							} else {
									if ("centre" == aO) {
											aV = (aS - aK[aM]) / 2
									}
							}
					}
					aQ.fillText(aU[aM], aN + aV, aH);
					aH += parseInt(aJ)
			}
	}
	function ar(aL, i, aK, j, aI, aJ, aH) {
			if (aJ) {
					aL.beginPath();
					aL.moveTo(i, aK + aI - aJ);
					aL.arcTo(i, aK, i + aJ, aK, aJ);
					aL.arcTo(i + j, aK, i + j, aK + aJ, aJ);
					aL.arcTo(i + j, aK + aI, i + j - aJ, aK + aI, aJ);
					aL.arcTo(i, aK + aI, i, aK + aI - aJ, aJ);
					aL.closePath();
					aL[aH ? "stroke" : "fill"]()
			} else {
					aL[aH ? "strokeRect" : "fillRect"](i, aK, j, aI)
			}
	}
	function g(aN, i, aL, aI, aM, aH, aJ, aK, j) {
			this.strings = aN;
			this.font = i;
			this.width = aL;
			this.height = aI;
			this.maxWidth = aM;
			this.stringWidths = aH;
			this.align = aJ;
			this.valign = aK;
			this.scale = j
	}
	aa = g.prototype;
	aa.SetImage = function(aK, j, aI, i, aJ, aM, aH, aL) {
			this.image = aK;
			this.iwidth = j * this.scale;
			this.iheight = aI * this.scale;
			this.ipos = i;
			this.ipad = aJ * this.scale;
			this.iscale = aL;
			this.ialign = aM;
			this.ivalign = aH
	}
	;
	aa.Align = function(j, aH, i) {
			var aI = 0;
			if (i == "right" || i == "bottom") {
					aI = aH - j
			} else {
					if (i != "left" && i != "top") {
							aI = (aH - j) / 2
					}
			}
			return aI
	}
	;
	aa.Create = function(aU, a0, aT, a1, aZ, aY, i, aX, aP) {
			var aN, aL, aV, a6, a3, a2, aJ, aI, aH, j, aM, aK, aO, aW, aS, a5 = L(i[0]), a4 = L(i[1]), aQ, aR;
			aX = s(aX, a5 + aY, a4 + aY);
			a3 = 2 * (aX + a1);
			aJ = 2 * (aX + a1);
			aL = this.width + a3;
			aV = this.height + aJ;
			aH = j = aX + a1;
			if (this.image) {
					aM = aK = aX + a1;
					aO = this.iwidth;
					aW = this.iheight;
					if (this.ipos == "top" || this.ipos == "bottom") {
							if (aO < this.width) {
									aM += this.Align(aO, this.width, this.ialign)
							} else {
									aH += this.Align(this.width, aO, this.align)
							}
							if (this.ipos == "top") {
									j += aW + this.ipad
							} else {
									aK += this.height + this.ipad
							}
							aL = s(aL, aO + a3);
							aV += aW + this.ipad
					} else {
							if (aW < this.height) {
									aK += this.Align(aW, this.height, this.ivalign)
							} else {
									j += this.Align(this.height, aW, this.valign)
							}
							if (this.ipos == "right") {
									aM += this.width + this.ipad
							} else {
									aH += aO + this.ipad
							}
							aL += aO + this.ipad;
							aV = s(aV, aW + aJ)
					}
			}
			aN = P(aL, aV);
			if (!aN) {
					return null
			}
			a3 = aJ = a1 / 2;
			a2 = aL - a1;
			aI = aV - a1;
			aS = aD(aP, a2 / 2, aI / 2);
			a6 = aN.getContext("2d");
			if (a0) {
					a6.fillStyle = a0;
					ar(a6, a3, aJ, a2, aI, aS)
			}
			if (a1) {
					a6.strokeStyle = aT;
					a6.lineWidth = a1;
					ar(a6, a3, aJ, a2, aI, aS, true)
			}
			if (aY || a5 || a4) {
					aQ = P(aL, aV);
					if (aQ) {
							aR = a6;
							a6 = aQ.getContext("2d")
					}
			}
			X(a6, this.font, aU, this.strings, aH, j, 0, 0, [], this.maxWidth, this.stringWidths, this.align);
			if (this.image) {
					a6.drawImage(this.image, aM, aK, aO, aW)
			}
			if (aR) {
					a6 = aR;
					aZ && (a6.shadowColor = aZ);
					aY && (a6.shadowBlur = aY);
					a6.shadowOffsetX = i[0];
					a6.shadowOffsetY = i[1];
					a6.drawImage(aQ, 0, 0)
			}
			return aN
	}
	;
	function v(aI, j, aJ) {
			var aH = P(j, aJ), aK;
			if (!aH) {
					return null
			}
			aK = aH.getContext("2d");
			aK.drawImage(aI, (j - aI.width) / 2, (aJ - aI.height) / 2);
			return aH
	}
	function ax(aI, j, aJ) {
			var aH = P(j, aJ), aK;
			if (!aH) {
					return null
			}
			aK = aH.getContext("2d");
			aK.drawImage(aI, 0, 0, j, aJ);
			return aH
	}
	function aC(aU, aP, aV, aZ, aQ, aO, aM, aS, aK, aL) {
			var aI = aP + ((2 * aS) + aO) * aZ, aR = aV + ((2 * aS) + aO) * aZ, aJ = P(aI, aR), aY, aX, aH, aW, j, a0, aT, aN;
			if (!aJ) {
					return null
			}
			aO *= aZ;
			aK *= aZ;
			aX = aH = aO / 2;
			aW = aI - aO;
			j = aR - aO;
			aS = (aS * aZ) + aX;
			aY = aJ.getContext("2d");
			aN = aD(aK, aW / 2, j / 2);
			if (aQ) {
					aY.fillStyle = aQ;
					ar(aY, aX, aH, aW, j, aN)
			}
			if (aO) {
					aY.strokeStyle = aM;
					aY.lineWidth = aO;
					ar(aY, aX, aH, aW, j, aN, true)
			}
			if (aL) {
					a0 = P(aI, aR);
					aT = a0.getContext("2d");
					aT.drawImage(aU, aS, aS, aP, aV);
					aT.globalCompositeOperation = "source-in";
					aT.fillStyle = aM;
					aT.fillRect(0, 0, aI, aR);
					aT.globalCompositeOperation = "destination-over";
					aT.drawImage(aJ, 0, 0);
					aT.globalCompositeOperation = "source-over";
					aY.drawImage(a0, 0, 0)
			} else {
					aY.drawImage(aU, aS, aS, aU.width, aU.height)
			}
			return {
					image: aJ,
					width: aI / aZ,
					height: aR / aZ
			}
	}
	function aq(aK, j, aJ, aN, aO) {
			var aL, aM, aH = parseFloat(j), aI = s(aJ, aN);
			aL = P(aJ, aN);
			if (!aL) {
					return null
			}
			if (j.indexOf("%") > 0) {
					aH = aI * aH / 100
			} else {
					aH = aH * aO
			}
			aM = aL.getContext("2d");
			aM.globalCompositeOperation = "source-over";
			aM.fillStyle = "#fff";
			if (aH >= aI / 2) {
					aH = aD(aJ, aN) / 2;
					aM.beginPath();
					aM.moveTo(aJ / 2, aN / 2);
					aM.arc(aJ / 2, aN / 2, aH, 0, 2 * Math.PI, false);
					aM.fill();
					aM.closePath()
			} else {
					aH = aD(aJ / 2, aN / 2, aH);
					ar(aM, 0, 0, aJ, aN, aH, true);
					aM.fill()
			}
			aM.globalCompositeOperation = "source-in";
			aM.drawImage(aK, 0, 0, aJ, aN);
			return aL
	}
	function Z(aN, aT, aP, aJ, aR, aS, aI) {
			var aU = L(aI[0]), aO = L(aI[1]), aK = aT + (aU > aS ? aU + aS : aS * 2) * aJ, j = aP + (aO > aS ? aO + aS : aS * 2) * aJ, aM = aJ * ((aS || 0) + (aI[0] < 0 ? aU : 0)), aH = aJ * ((aS || 0) + (aI[1] < 0 ? aO : 0)), aL, aQ;
			aL = P(aK, j);
			if (!aL) {
					return null
			}
			aQ = aL.getContext("2d");
			aR && (aQ.shadowColor = aR);
			aS && (aQ.shadowBlur = aS * aJ);
			aI && (aQ.shadowOffsetX = aI[0] * aJ,
			aQ.shadowOffsetY = aI[1] * aJ);
			aQ.drawImage(aN, aM, aH, aT, aP);
			return {
					image: aL,
					width: aK / aJ,
					height: j / aJ
			}
	}
	function t(aT, aL, aR) {
			var aS = parseInt(aT.toString().length * aR), aK = parseInt(aR * 2 * aT.length), aI = P(aS, aK), aO, j, aJ, aN, aQ, aP, aH, aM;
			if (!aI) {
					return null
			}
			aO = aI.getContext("2d");
			aO.fillStyle = "#000";
			aO.fillRect(0, 0, aS, aK);
			X(aO, aR + "px " + aL, "#fff", aT, 0, 0, 0, 0, [], "centre");
			j = aO.getImageData(0, 0, aS, aK);
			aJ = j.width;
			aN = j.height;
			aM = {
					min: {
							x: aJ,
							y: aN
					},
					max: {
							x: -1,
							y: -1
					}
			};
			for (aP = 0; aP < aN; ++aP) {
					for (aQ = 0; aQ < aJ; ++aQ) {
							aH = (aP * aJ + aQ) * 4;
							if (j.data[aH + 1] > 0) {
									if (aQ < aM.min.x) {
											aM.min.x = aQ
									}
									if (aQ > aM.max.x) {
											aM.max.x = aQ
									}
									if (aP < aM.min.y) {
											aM.min.y = aP
									}
									if (aP > aM.max.y) {
											aM.max.y = aP
									}
							}
					}
			}
			if (aJ != aS) {
					aM.min.x *= (aS / aJ);
					aM.max.x *= (aS / aJ)
			}
			if (aN != aK) {
					aM.min.y *= (aS / aN);
					aM.max.y *= (aS / aN)
			}
			aI = null;
			return aM
	}
	function o(i) {
			return "'" + i.replace(/(\'|\")/g, "").replace(/\s*,\s*/g, "', '") + "'"
	}
	function ad(i, j, aH) {
			aH = aH || C;
			if (aH.addEventListener) {
					aH.addEventListener(i, j, false)
			} else {
					aH.attachEvent("on" + i, j)
			}
	}
	function a(i, j, aH) {
			aH = aH || C;
			if (aH.removeEventListener) {
					aH.removeEventListener(i, j)
			} else {
					aH.detachEvent("on" + i, j)
			}
	}
	function aw(aL, aH, aP, aK) {
			var aQ = aK.imageScale, aN, aI, aM, j, aJ, aO;
			if (!aH.complete) {
					return ad("load", function() {
							aw(aL, aH, aP, aK)
					}, aH)
			}
			if (!aL.complete) {
					return ad("load", function() {
							aw(aL, aH, aP, aK)
					}, aL)
			}
			aH.width = aH.width;
			aH.height = aH.height;
			if (aQ) {
					aL.width = aH.width * aQ;
					aL.height = aH.height * aQ
			}
			aP.iw = aL.width;
			aP.ih = aL.height;
			if (aK.txtOpt) {
					aI = aL;
					aN = aK.zoomMax * aK.txtScale;
					aJ = aP.iw * aN;
					aO = aP.ih * aN;
					if (aJ < aH.naturalWidth || aO < aH.naturalHeight) {
							aI = ax(aL, aJ, aO);
							if (aI) {
									aP.fimage = aI
							}
					} else {
							aJ = aP.iw;
							aO = aP.ih;
							aN = 1
					}
					if (parseFloat(aK.imageRadius)) {
							aP.image = aP.fimage = aL = aq(aP.image, aK.imageRadius, aJ, aO, aN)
					}
					if (!aP.HasText()) {
							if (aK.shadow) {
									aI = Z(aP.image, aJ, aO, aN, aK.shadow, aK.shadowBlur, aK.shadowOffset);
									if (aI) {
											aP.fimage = aI.image;
											aP.w = aI.width;
											aP.h = aI.height
									}
							}
							if (aK.bgColour || aK.bgOutlineThickness) {
									aM = aK.bgColour == "tag" ? Y(aP.a, "background-color") : aK.bgColour;
									j = aK.bgOutline == "tag" ? Y(aP.a, "color") : (aK.bgOutline || aK.textColour);
									aJ = aP.fimage.width;
									aO = aP.fimage.height;
									if (aK.outlineMethod == "colour") {
											aI = aC(aP.fimage, aJ, aO, aN, aM, aK.bgOutlineThickness, aP.outline.colour, aK.padding, aK.bgRadius, 1);
											if (aI) {
													aP.oimage = aI.image
											}
									}
									aI = aC(aP.fimage, aJ, aO, aN, aM, aK.bgOutlineThickness, j, aK.padding, aK.bgRadius);
									if (aI) {
											aP.fimage = aI.image;
											aP.w = aI.width;
											aP.h = aI.height
									}
							}
							if (aK.outlineMethod == "size") {
									if (aK.outlineIncrease > 0) {
											aP.iw += 2 * aK.outlineIncrease;
											aP.ih += 2 * aK.outlineIncrease;
											aJ = aN * aP.iw;
											aO = aN * aP.ih;
											aI = ax(aP.fimage, aJ, aO);
											aP.oimage = aI;
											aP.fimage = v(aP.fimage, aP.oimage.width, aP.oimage.height)
									} else {
											aJ = aN * (aP.iw + (2 * aK.outlineIncrease));
											aO = aN * (aP.ih + (2 * aK.outlineIncrease));
											aI = ax(aP.fimage, aJ, aO);
											aP.oimage = v(aI, aP.fimage.width, aP.fimage.height)
									}
							}
					}
			}
			aP.Init()
	}
	function Y(aI, aH) {
			var j = C.defaultView
				, i = aH.replace(/\-([a-z])/g, function(aJ) {
					return aJ.charAt(1).toUpperCase()
			});
			return (j && j.getComputedStyle && j.getComputedStyle(aI, null).getPropertyValue(aH)) || (aI.currentStyle && aI.currentStyle[i])
	}
	function u(j, aI, aH) {
			var i = 1, aJ;
			if (aI) {
					i = 1 * (j.getAttribute(aI) || aH)
			} else {
					if (aJ = Y(j, "font-size")) {
							i = (aJ.indexOf("px") > -1 && aJ.replace("px", "") * 1) || (aJ.indexOf("pt") > -1 && aJ.replace("pt", "") * 1.25) || aJ * 3.3
					}
			}
			return i
	}
	function f(i) {
			return i.target && ai(i.target.id) ? i.target.id : i.srcElement.parentNode.id
	}
	function S(aJ, aK) {
			var aI, aH, i = parseInt(Y(aK, "width")) / aK.width, j = parseInt(Y(aK, "height")) / aK.height;
			if (ai(aJ.offsetX)) {
					aI = {
							x: aJ.offsetX,
							y: aJ.offsetY
					}
			} else {
					aH = ab(aK.id);
					if (ai(aJ.changedTouches)) {
							aJ = aJ.changedTouches[0]
					}
					if (aJ.pageX) {
							aI = {
									x: aJ.pageX - aH.x,
									y: aJ.pageY - aH.y
							}
					}
			}
			if (aI && i && j) {
					aI.x /= i;
					aI.y /= j
			}
			return aI
	}
	function B(aH) {
			var j = aH.target || aH.fromElement.parentNode
				, i = y.tc[j.id];
			if (i) {
					i.mx = i.my = -1;
					i.UnFreeze();
					i.EndDrag()
			}
	}
	function af(aL) {
			var aI, aH = y, j, aK, aJ = f(aL);
			for (aI in aH.tc) {
					j = aH.tc[aI];
					if (j.tttimer) {
							clearTimeout(j.tttimer);
							j.tttimer = null
					}
			}
			if (aJ && aH.tc[aJ]) {
					j = aH.tc[aJ];
					if (aK = S(aL, j.canvas)) {
							j.mx = aK.x;
							j.my = aK.y;
							j.Drag(aL, aK)
					}
					j.drawn = 0
			}
	}
	function z(aI) {
			var j = y
				, i = C.addEventListener ? 0 : 1
				, aH = f(aI);
			if (aH && aI.button == i && j.tc[aH]) {
					j.tc[aH].BeginDrag(aI)
			}
	}
	function aE(aJ) {
			var aH = y, j = C.addEventListener ? 0 : 1, aI = f(aJ), i;
			if (aI && aJ.button == j && aH.tc[aI]) {
					i = aH.tc[aI];
					af(aJ);
					if (!i.EndDrag() && !i.touchState) {
							i.Clicked(aJ)
					}
			}
	}
	function T(aI) {
			var j = f(aI), i = (j && y.tc[j]), aH;
			if (i && aI.changedTouches) {
					if (aI.touches.length == 1 && i.touchState == 0) {
							i.touchState = 1;
							i.BeginDrag(aI);
							if (aH = S(aI, i.canvas)) {
									i.mx = aH.x;
									i.my = aH.y;
									i.drawn = 0
							}
					} else {
							if (aI.targetTouches.length == 2 && i.pinchZoom) {
									i.touchState = 3;
									i.EndDrag();
									i.BeginPinch(aI)
							} else {
									i.EndDrag();
									i.EndPinch();
									i.touchState = 0
							}
					}
			}
	}
	function r(aH) {
			var j = f(aH)
				, i = (j && y.tc[j]);
			if (i && aH.changedTouches) {
					switch (i.touchState) {
					case 1:
							i.Draw();
							i.Clicked();
							break;
					case 2:
							i.EndDrag();
							break;
					case 3:
							i.EndPinch()
					}
					i.touchState = 0
			}
	}
	function az(aL) {
			var aI, aH = y, j, aK, aJ = f(aL);
			for (aI in aH.tc) {
					j = aH.tc[aI];
					if (j.tttimer) {
							clearTimeout(j.tttimer);
							j.tttimer = null
					}
			}
			j = (aJ && aH.tc[aJ]);
			if (j && aL.changedTouches && j.touchState) {
					switch (j.touchState) {
					case 1:
					case 2:
							if (aK = S(aL, j.canvas)) {
									j.mx = aK.x;
									j.my = aK.y;
									if (j.Drag(aL, aK)) {
											j.touchState = 2
									}
							}
							break;
					case 3:
							j.Pinch(aL)
					}
					j.drawn = 0
			}
	}
	function ag(aH) {
			var i = y
				, j = f(aH);
			if (j && i.tc[j]) {
					aH.cancelBubble = true;
					aH.returnValue = false;
					aH.preventDefault && aH.preventDefault();
					i.tc[j].Wheel((aH.wheelDelta || aH.detail) > 0)
			}
	}
	function ac(aI) {
			var aH, j = y;
			clearTimeout(j.scrollTimer);
			for (aH in j.tc) {
					j.tc[aH].Pause()
			}
			j.scrollTimer = setTimeout(function() {
					var aK, aJ = y;
					for (aK in aJ.tc) {
							aJ.tc[aK].Resume()
					}
			}, j.scrollPause)
	}
	function O() {
			E(G())
	}
	function E(aI) {
			var j = y.tc, aH;
			y.NextFrame(y.interval);
			aI = aI || G();
			for (aH in j) {
					j[aH].Draw(aI)
			}
	}
	function ab(aH) {
			var aK = C.getElementById(aH)
				, i = aK.getBoundingClientRect()
				, aN = C.documentElement
				, aL = C.body
				, aM = window
				, aI = aM.pageXOffset || aN.scrollLeft
				, aO = aM.pageYOffset || aN.scrollTop
				, aJ = aN.clientLeft || aL.clientLeft
				, j = aN.clientTop || aL.clientTop;
			return {
					x: i.left + aI - aJ,
					y: i.top + aO - j
			}
	}
	function V(j, aI, aJ, aH) {
			var i = j.radius * j.z1 / (j.z1 + j.z2 + aI.z);
			return {
					x: aI.x * i * aJ,
					y: aI.y * i * aH,
					z: aI.z,
					w: (j.z1 - aI.z) / j.z2
			}
	}
	function aB(i) {
			this.e = i;
			this.br = 0;
			this.line = [];
			this.text = [];
			this.original = i.innerText || i.textContent
	}
	aG = aB.prototype;
	aG.Empty = function() {
			for (var j = 0; j < this.text.length; ++j) {
					if (this.text[j].length) {
							return false
					}
			}
			return true
	}
	;
	aG.Lines = function(aJ) {
			var aI = aJ ? 1 : 0, aK, j, aH;
			aJ = aJ || this.e;
			aK = aJ.childNodes;
			j = aK.length;
			for (aH = 0; aH < j; ++aH) {
					if (aK[aH].nodeName == "BR") {
							this.text.push(this.line.join(" "));
							this.br = 1
					} else {
							if (aK[aH].nodeType == 3) {
									if (this.br) {
											this.line = [aK[aH].nodeValue];
											this.br = 0
									} else {
											this.line.push(aK[aH].nodeValue)
									}
							} else {
									this.Lines(aK[aH])
							}
					}
			}
			aI || this.br || this.text.push(this.line.join(" "));
			return this.text
	}
	;
	aG.SplitWidth = function(aH, aO, aL, aK) {
			var aJ, aI, aN, aM = [];
			aO.font = aK + "px " + aL;
			for (aJ = 0; aJ < this.text.length; ++aJ) {
					aN = this.text[aJ].split(/\s+/);
					this.line = [aN[0]];
					for (aI = 1; aI < aN.length; ++aI) {
							if (aO.measureText(this.line.join(" ") + " " + aN[aI]).width > aH) {
									aM.push(this.line.join(" "));
									this.line = [aN[aI]]
							} else {
									this.line.push(aN[aI])
							}
					}
					aM.push(this.line.join(" "))
			}
			return this.text = aM
	}
	;
	function J(i, j) {
			this.ts = null;
			this.tc = i;
			this.tag = j;
			this.x = this.y = this.w = this.h = this.sc = 1;
			this.z = 0;
			this.pulse = 1;
			this.pulsate = i.pulsateTo < 1;
			this.colour = i.outlineColour;
			this.adash = ~~i.outlineDash;
			this.agap = ~~i.outlineDashSpace || this.adash;
			this.aspeed = i.outlineDashSpeed * 1;
			if (this.colour == "tag") {
					this.colour = Y(j.a, "color")
			} else {
					if (this.colour == "tagbg") {
							this.colour = Y(j.a, "background-color")
					}
			}
			this.Draw = this.pulsate ? this.DrawPulsate : this.DrawSimple;
			this.radius = i.outlineRadius | 0;
			this.SetMethod(i.outlineMethod)
	}
	x = J.prototype;
	x.SetMethod = function(aH) {
			var j = {
					block: ["PreDraw", "DrawBlock"],
					colour: ["PreDraw", "DrawColour"],
					outline: ["PostDraw", "DrawOutline"],
					classic: ["LastDraw", "DrawOutline"],
					size: ["PreDraw", "DrawSize"],
					none: ["LastDraw"]
			}
				, i = j[aH] || j.outline;
			if (aH == "none") {
					this.Draw = function() {
							return 1
					}
			} else {
					this.drawFunc = this[i[1]]
			}
			this[i[0]] = this.Draw
	}
	;
	x.Update = function(aN, aM, aO, aJ, aK, aL, aI, i) {
			var j = this.tc.outlineOffset
				, aH = 2 * j;
			this.x = aK * aN + aI - j;
			this.y = aK * aM + i - j;
			this.w = aK * aO + aH;
			this.h = aK * aJ + aH;
			this.sc = aK;
			this.z = aL
	}
	;
	x.Ants = function(aM) {
			if (!this.adash) {
					return
			}
			var aJ = this.adash, aL = this.agap, aP = this.aspeed, j = aJ + aL, aK = 0, aI = aJ, i = aL, aO = 0, aN = 0, aH;
			if (aP) {
					aN = L(aP) * (G() - this.ts) / 50;
					if (aP < 0) {
							aN = 8640000 - aN
					}
					aP = ~~aN % j
			}
			if (aP) {
					if (aJ >= aP) {
							aK = aJ - aP;
							aI = aP
					} else {
							i = j - aP;
							aO = aL - i
					}
					aH = [aK, i, aI, aO]
			} else {
					aH = [aJ, aL]
			}
			aM.setLineDash(aH)
	}
	;
	x.DrawOutline = function(aL, i, aK, j, aH, aJ) {
			var aI = aD(this.radius, aH / 2, j / 2);
			aL.strokeStyle = aJ;
			this.Ants(aL);
			ar(aL, i, aK, j, aH, aI, true)
	}
	;
	x.DrawSize = function(aO, aR, aP, aS, aM, j, aT, aI, aQ) {
			var aL = aT.w, aH = aT.h, aJ, aK, aN;
			if (this.pulsate) {
					if (aT.image) {
							aN = (aT.image.height + this.tc.outlineIncrease) / aT.image.height
					} else {
							aN = aT.oscale
					}
					aK = aT.fimage || aT.image;
					aJ = 1 + ((aN - 1) * (1 - this.pulse));
					aT.h *= aJ;
					aT.w *= aJ
			} else {
					aK = aT.oimage
			}
			aT.alpha = 1;
			aT.Draw(aO, aI, aQ, aK);
			aT.h = aH;
			aT.w = aL;
			return 1
	}
	;
	x.DrawColour = function(aI, aL, aJ, aM, aH, i, aN, j, aK) {
			if (aN.oimage) {
					if (this.pulse < 1) {
							aN.alpha = 1 - at(this.pulse, 2);
							aN.Draw(aI, j, aK, aN.fimage);
							aN.alpha = this.pulse
					} else {
							aN.alpha = 1
					}
					aN.Draw(aI, j, aK, aN.oimage);
					return 1
			}
			return this[aN.image ? "DrawColourImage" : "DrawColourText"](aI, aL, aJ, aM, aH, i, aN, j, aK)
	}
	;
	x.DrawColourText = function(aJ, aM, aK, aN, aH, i, aO, j, aL) {
			var aI = aO.colour;
			aO.colour = i;
			aO.alpha = 1;
			aO.Draw(aJ, j, aL);
			aO.colour = aI;
			return 1
	}
	;
	x.DrawColourImage = function(aM, aP, aN, aQ, aL, i, aT, j, aO) {
			var aR = aM.canvas, aJ = ~~s(aP, 0), aI = ~~s(aN, 0), aK = aD(aR.width - aJ, aQ) + 0.5 | 0, aS = aD(aR.height - aI, aL) + 0.5 | 0, aH;
			if (p) {
					p.width = aK,
					p.height = aS
			} else {
					p = P(aK, aS)
			}
			if (!p) {
					return this.SetMethod("outline")
			}
			aH = p.getContext("2d");
			aH.drawImage(aR, aJ, aI, aK, aS, 0, 0, aK, aS);
			aM.clearRect(aJ, aI, aK, aS);
			if (this.pulsate) {
					aT.alpha = 1 - at(this.pulse, 2)
			} else {
					aT.alpha = 1
			}
			aT.Draw(aM, j, aO);
			aM.setTransform(1, 0, 0, 1, 0, 0);
			aM.save();
			aM.beginPath();
			aM.rect(aJ, aI, aK, aS);
			aM.clip();
			aM.globalCompositeOperation = "source-in";
			aM.fillStyle = i;
			aM.fillRect(aJ, aI, aK, aS);
			aM.restore();
			aM.globalAlpha = 1;
			aM.globalCompositeOperation = "destination-over";
			aM.drawImage(p, 0, 0, aK, aS, aJ, aI, aK, aS);
			aM.globalCompositeOperation = "source-over";
			return 1
	}
	;
	x.DrawBlock = function(aL, i, aK, j, aH, aJ) {
			var aI = aD(this.radius, aH / 2, j / 2);
			aL.fillStyle = aJ;
			ar(aL, i, aK, j, aH, aI)
	}
	;
	x.DrawSimple = function(aL, i, j, aI, aK, aJ) {
			var aH = this.tc;
			aL.setTransform(1, 0, 0, 1, 0, 0);
			aL.strokeStyle = this.colour;
			aL.lineWidth = aH.outlineThickness;
			aL.shadowBlur = aL.shadowOffsetX = aL.shadowOffsetY = 0;
			aL.globalAlpha = aJ ? aK : 1;
			return this.drawFunc(aL, this.x, this.y, this.w, this.h, this.colour, i, j, aI)
	}
	;
	x.DrawPulsate = function(aL, i, j, aI) {
			var aJ = G() - this.ts
				, aH = this.tc
				, aK = aH.pulsateTo + ((1 - aH.pulsateTo) * (0.5 + (w(2 * Math.PI * aJ / (1000 * aH.pulsateTime)) / 2)));
			this.pulse = aK = y.Smooth(1, aK);
			return this.DrawSimple(aL, i, j, aI, aK, 1)
	}
	;
	x.Active = function(aI, i, aH) {
			var j = (i >= this.x && aH >= this.y && i <= this.x + this.w && aH <= this.y + this.h);
			if (j) {
					this.ts = this.ts || G()
			} else {
					this.ts = null
			}
			return j
	}
	;
	x.PreDraw = x.PostDraw = x.LastDraw = aA;
	function e(aI, aS, aO, aR, aP, aJ, aH, aL, aQ, aK, aN, j, aM, i) {
			this.tc = aI;
			this.image = null;
			this.text = aS;
			this.text_original = i;
			this.line_widths = [];
			this.title = aO.title || null;
			this.a = aO;
			this.position = new ae(aR[0],aR[1],aR[2]);
			this.x = this.y = this.z = 0;
			this.w = aP;
			this.h = aJ;
			this.colour = aH || aI.textColour;
			this.bgColour = aL || aI.bgColour;
			this.bgRadius = aQ | 0;
			this.bgOutline = aK || this.colour;
			this.bgOutlineThickness = aN | 0;
			this.textFont = j || aI.textFont;
			this.padding = aM | 0;
			this.sc = this.alpha = 1;
			this.weighted = !aI.weight;
			this.outline = new J(aI,this)
	}
	c = e.prototype;
	c.Init = function(j) {
			var i = this.tc;
			this.textHeight = i.textHeight;
			if (this.HasText()) {
					this.Measure(i.ctxt, i)
			} else {
					this.w = this.iw;
					this.h = this.ih
			}
			this.SetShadowColour = i.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
			this.SetDraw(i)
	}
	;
	c.Draw = aA;
	c.HasText = function() {
			return this.text && this.text[0].length > 0
	}
	;
	c.EqualTo = function(aH) {
			var j = aH.getElementsByTagName("img");
			if (this.a.href != aH.href) {
					return 0
			}
			if (j.length) {
					return this.image.src == j[0].src
			}
			return (aH.innerText || aH.textContent) == this.text_original
	}
	;
	c.SetImage = function(j) {
			this.image = this.fimage = j
	}
	;
	c.SetDraw = function(i) {
			this.Draw = this.fimage ? (i.ie > 7 ? this.DrawImageIE : this.DrawImage) : this.DrawText;
			i.noSelect && (this.CheckActive = aA)
	}
	;
	c.MeasureText = function(aK) {
			var aI, aH = this.text.length, j = 0, aJ;
			for (aI = 0; aI < aH; ++aI) {
					this.line_widths[aI] = aJ = aK.measureText(this.text[aI]).width;
					j = s(j, aJ)
			}
			return j
	}
	;
	c.Measure = function(aM, aP) {
			var aN = t(this.text, this.textFont, this.textHeight), aQ, i, aJ, j, aH, aL, aO, aI, aK;
			aO = aN ? aN.max.y + aN.min.y : this.textHeight;
			aM.font = this.font = this.textHeight + "px " + this.textFont;
			aL = this.MeasureText(aM);
			if (aP.txtOpt) {
					aQ = aP.txtScale;
					i = aQ * this.textHeight;
					aJ = i + "px " + this.textFont;
					j = [aQ * aP.shadowOffset[0], aQ * aP.shadowOffset[1]];
					aM.font = aJ;
					aH = this.MeasureText(aM);
					aK = new g(this.text,aJ,aH + aQ,(aQ * aO) + aQ,aH,this.line_widths,aP.textAlign,aP.textVAlign,aQ);
					if (this.image) {
							aK.SetImage(this.image, this.iw, this.ih, aP.imagePosition, aP.imagePadding, aP.imageAlign, aP.imageVAlign, aP.imageScale)
					}
					aI = aK.Create(this.colour, this.bgColour, this.bgOutline, aQ * this.bgOutlineThickness, aP.shadow, aQ * aP.shadowBlur, j, aQ * this.padding, aQ * this.bgRadius);
					if (aP.outlineMethod == "colour") {
							this.oimage = aK.Create(this.outline.colour, this.bgColour, this.outline.colour, aQ * this.bgOutlineThickness, aP.shadow, aQ * aP.shadowBlur, j, aQ * this.padding, aQ * this.bgRadius)
					} else {
							if (aP.outlineMethod == "size") {
									aN = t(this.text, this.textFont, this.textHeight + aP.outlineIncrease);
									i = aN.max.y + aN.min.y;
									aJ = (aQ * (this.textHeight + aP.outlineIncrease)) + "px " + this.textFont;
									aM.font = aJ;
									aH = this.MeasureText(aM);
									aK = new g(this.text,aJ,aH + aQ,(aQ * i) + aQ,aH,this.line_widths,aP.textAlign,aP.textVAlign,aQ);
									if (this.image) {
											aK.SetImage(this.image, this.iw + aP.outlineIncrease, this.ih + aP.outlineIncrease, aP.imagePosition, aP.imagePadding, aP.imageAlign, aP.imageVAlign, aP.imageScale)
									}
									this.oimage = aK.Create(this.colour, this.bgColour, this.bgOutline, aQ * this.bgOutlineThickness, aP.shadow, aQ * aP.shadowBlur, j, aQ * this.padding, aQ * this.bgRadius);
									this.oscale = this.oimage.width / aI.width;
									if (aP.outlineIncrease > 0) {
											aI = v(aI, this.oimage.width, this.oimage.height)
									} else {
											this.oimage = v(this.oimage, aI.width, aI.height)
									}
							}
					}
					if (aI) {
							this.fimage = aI;
							aL = this.fimage.width / aQ;
							aO = this.fimage.height / aQ
					}
					this.SetDraw(aP);
					aP.txtOpt = !!this.fimage
			}
			this.h = aO;
			this.w = aL
	}
	;
	c.SetFont = function(j, aI, aH, i) {
			this.textFont = j;
			this.colour = aI;
			this.bgColour = aH;
			this.bgOutline = i;
			this.Measure(this.tc.ctxt, this.tc)
	}
	;
	c.SetWeight = function(aH) {
			var j = this.tc, aJ = j.weightMode.split(/[, ]/), i, aI, aK = aH.length;
			if (!this.HasText()) {
					return
			}
			this.weighted = true;
			for (aI = 0; aI < aK; ++aI) {
					i = aJ[aI] || "size";
					if ("both" == i) {
							this.Weight(aH[aI], j.ctxt, j, "size", j.min_weight[aI], j.max_weight[aI], aI);
							this.Weight(aH[aI], j.ctxt, j, "colour", j.min_weight[aI], j.max_weight[aI], aI)
					} else {
							this.Weight(aH[aI], j.ctxt, j, i, j.min_weight[aI], j.max_weight[aI], aI)
					}
			}
			this.Measure(j.ctxt, j)
	}
	;
	c.Weight = function(aH, aM, aI, j, aL, aJ, aK) {
			aH = isNaN(aH) ? 1 : aH;
			var i = (aH - aL) / (aJ - aL);
			if ("colour" == j) {
					this.colour = k(aI, i, aK)
			} else {
					if ("bgcolour" == j) {
							this.bgColour = k(aI, i, aK)
					} else {
							if ("bgoutline" == j) {
									this.bgOutline = k(aI, i, aK)
							} else {
									if ("outline" == j) {
											this.outline.colour = k(aI, i, aK)
									} else {
											if ("size" == j) {
													if (aI.weightSizeMin > 0 && aI.weightSizeMax > aI.weightSizeMin) {
															this.textHeight = aI.weightSize * (aI.weightSizeMin + (aI.weightSizeMax - aI.weightSizeMin) * i)
													} else {
															this.textHeight = s(1, aH * aI.weightSize)
													}
											}
									}
							}
					}
			}
	}
	;
	c.SetShadowColourFixed = function(aH, j, i) {
			aH.shadowColor = j
	}
	;
	c.SetShadowColourAlpha = function(aH, j, i) {
			aH.shadowColor = U(j, i)
	}
	;
	c.DrawText = function(aJ, aM, aI) {
			var aN = this.tc, aL = this.x, aK = this.y, aO = this.sc, j, aH;
			aJ.globalAlpha = this.alpha;
			aJ.fillStyle = this.colour;
			aN.shadow && this.SetShadowColour(aJ, aN.shadow, this.alpha);
			aJ.font = this.font;
			aL += aM / aO;
			aK += (aI / aO) - (this.h / 2);
			for (j = 0; j < this.text.length; ++j) {
					aH = aL;
					if ("right" == aN.textAlign) {
							aH += this.w / 2 - this.line_widths[j]
					} else {
							if ("centre" == aN.textAlign) {
									aH -= this.line_widths[j] / 2
							} else {
									aH -= this.w / 2
							}
					}
					aJ.setTransform(aO, 0, 0, aO, aO * aH, aO * aK);
					aJ.fillText(this.text[j], 0, 0);
					aK += this.textHeight
			}
	}
	;
	c.DrawImage = function(aJ, aQ, aI, aL) {
			var aN = this.x
				, aK = this.y
				, aR = this.sc
				, j = aL || this.fimage
				, aO = this.w
				, aH = this.h
				, aM = this.alpha
				, aP = this.shadow;
			aJ.globalAlpha = aM;
			aP && this.SetShadowColour(aJ, aP, aM);
			aN += (aQ / aR) - (aO / 2);
			aK += (aI / aR) - (aH / 2);
			aJ.setTransform(aR, 0, 0, aR, aR * aN, aR * aK);
			aJ.drawImage(j, 0, 0, aO, aH)
	}
	;
	c.DrawImageIE = function(aJ, aN, aI) {
			var j = this.fimage
				, aO = this.sc
				, aM = j.width = this.w * aO
				, aH = j.height = this.h * aO
				, aL = (this.x * aO) + aN - (aM / 2)
				, aK = (this.y * aO) + aI - (aH / 2);
			aJ.setTransform(1, 0, 0, 1, 0, 0);
			aJ.globalAlpha = this.alpha;
			aJ.drawImage(j, aL, aK)
	}
	;
	c.Calc = function(i, aH) {
			var j, aK = this.tc, aJ = aK.minBrightness, aI = aK.maxBrightness, aL = aK.max_radius;
			j = i.xform(this.position);
			this.xformed = j;
			j = V(aK, j, aK.stretchX, aK.stretchY);
			this.x = j.x;
			this.y = j.y;
			this.z = j.z;
			this.sc = j.w;
			this.alpha = aH * av(aJ + (aI - aJ) * (aL - this.z) / (2 * aL), 0, 1);
			return this.xformed
	}
	;
	c.UpdateActive = function(aM, aH, aK) {
			var aJ = this.outline
				, j = this.w
				, aI = this.h
				, i = this.x - j / 2
				, aL = this.y - aI / 2;
			aJ.Update(i, aL, j, aI, this.sc, this.z, aH, aK);
			return aJ
	}
	;
	c.CheckActive = function(aJ, i, aI) {
			var j = this.tc
				, aH = this.UpdateActive(aJ, i, aI);
			return aH.Active(aJ, j.mx, j.my) ? aH : null
	}
	;
	c.Clicked = function(aK) {
			var j = this.a, aH = j.target, aI = j.href, i;
			if (aH != "" && aH != "_self") {
					if (self.frames[aH]) {
							self.frames[aH].document.location = aI
					} else {
							try {
									if (top.frames[aH]) {
											top.frames[aH].document.location = aI;
											return
									}
							} catch (aJ) {}
							window.open(aI, aH)
					}
					return
			}
			if (C.createEvent) {
					i = C.createEvent("MouseEvents");
					i.initMouseEvent("click", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
					if (!j.dispatchEvent(i)) {
							return
					}
			} else {
					if (j.fireEvent) {
							if (!j.fireEvent("onclick")) {
									return
							}
					}
			}
			C.location = aI
	}
	;
	function y(aN, j, aI) {
			var aH, aK, aM = C.getElementById(aN), aJ = ["id", "class", "innerHTML"], aL;
			if (!aM) {
					throw 0
			}
			if (ai(window.G_vmlCanvasManager)) {
					aM = window.G_vmlCanvasManager.initElement(aM);
					this.ie = parseFloat(navigator.appVersion.split("MSIE")[1])
			}
			if (aM && (!aM.getContext || !aM.getContext("2d").fillText)) {
					aK = C.createElement("DIV");
					for (aH = 0; aH < aJ.length; ++aH) {
							aK[aJ[aH]] = aM[aJ[aH]]
					}
					aM.parentNode.insertBefore(aK, aM);
					aM.parentNode.removeChild(aM);
					throw 0
			}
			for (aH in y.options) {
					this[aH] = aI && ai(aI[aH]) ? aI[aH] : (ai(y[aH]) ? y[aH] : y.options[aH])
			}
			this.canvas = aM;
			this.ctxt = aM.getContext("2d");
			this.z1 = 250 / s(this.depth, 0.001);
			this.z2 = this.z1 / this.zoom;
			this.radius = aD(aM.height, aM.width) * 0.0075;
			this.max_radius = 100;
			this.max_weight = [];
			this.min_weight = [];
			this.textFont = this.textFont && o(this.textFont);
			this.textHeight *= 1;
			this.imageRadius = this.imageRadius.toString();
			this.pulsateTo = av(this.pulsateTo, 0, 1);
			this.minBrightness = av(this.minBrightness, 0, 1);
			this.maxBrightness = av(this.maxBrightness, this.minBrightness, 1);
			this.ctxt.textBaseline = "top";
			this.lx = (this.lock + "").indexOf("x") + 1;
			this.ly = (this.lock + "").indexOf("y") + 1;
			this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
			this.fixedAlpha = 1;
			this.source = j || aN;
			this.repeatTags = aD(64, ~~this.repeatTags);
			this.minTags = aD(200, ~~this.minTags);
			if (~~this.scrollPause > 0) {
					y.scrollPause = ~~this.scrollPause
			} else {
					this.scrollPause = 0
			}
			if (this.minTags > 0 && this.repeatTags < 1 && (aH = this.GetTags().length)) {
					this.repeatTags = ap(this.minTags / aH) - 1
			}
			this.transform = R.Identity();
			this.startTime = this.time = G();
			this.mx = this.my = -1;
			this.centreImage && ao(this);
			this.Animate = this.dragControl ? this.AnimateDrag : this.AnimatePosition;
			this.animTiming = (typeof y[this.animTiming] == "function" ? y[this.animTiming] : y.Smooth);
			if (this.shadowBlur || this.shadowOffset[0] || this.shadowOffset[1]) {
					this.ctxt.shadowColor = this.shadow;
					this.shadow = this.ctxt.shadowColor;
					this.shadowAlpha = al()
			} else {
					delete this.shadow
			}
			this.Load();
			if (j && this.hideTags) {
					(function(i) {
							if (y.loaded) {
									i.HideTags()
							} else {
									ad("load", function() {
											i.HideTags()
									}, window)
							}
					}
					)(this)
			}
			this.yaw = this.initial ? this.initial[0] * this.maxSpeed : 0;
			this.pitch = this.initial ? this.initial[1] * this.maxSpeed : 0;
			if (this.tooltip) {
					this.ctitle = aM.title;
					aM.title = "";
					if (this.tooltip == "native") {
							this.Tooltip = this.TooltipNative
					} else {
							this.Tooltip = this.TooltipDiv;
							if (!this.ttdiv) {
									this.ttdiv = C.createElement("div");
									this.ttdiv.className = this.tooltipClass;
									this.ttdiv.style.position = "absolute";
									this.ttdiv.style.zIndex = aM.style.zIndex + 1;
									ad("mouseover", function(i) {
											i.target.style.display = "none"
									}, this.ttdiv);
									C.body.appendChild(this.ttdiv)
							}
					}
			} else {
					this.Tooltip = this.TooltipNone
			}
			if (!this.noMouse && !b[aN]) {
					b[aN] = [["mousemove", af], ["mouseout", B], ["mouseup", aE], ["touchstart", T], ["touchend", r], ["touchcancel", r], ["touchmove", az]];
					if (this.dragControl) {
							b[aN].push(["mousedown", z]);
							b[aN].push(["selectstart", aA])
					}
					if (this.wheelZoom) {
							b[aN].push(["mousewheel", ag]);
							b[aN].push(["DOMMouseScroll", ag])
					}
					if (this.scrollPause) {
							b[aN].push(["scroll", ac, window])
					}
					for (aH = 0; aH < b[aN].length; ++aH) {
							aK = b[aN][aH];
							ad(aK[0], aK[1], aK[2] ? aK[2] : aM)
					}
			}
			if (!y.started) {
					aL = window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
					y.NextFrame = aL ? y.NextFrameRAF : y.NextFrameTimeout;
					y.interval = this.interval;
					y.NextFrame(this.interval);
					y.started = 1
			}
	}
	Q = y.prototype;
	Q.SourceElements = function() {
			if (C.querySelectorAll) {
					return C.querySelectorAll("#" + this.source)
			}
			return [C.getElementById(this.source)]
	}
	;
	Q.HideTags = function() {
			var aH = this.SourceElements(), j;
			for (j = 0; j < aH.length; ++j) {
					aH[j].style.display = "none"
			}
	}
	;
	Q.GetTags = function() {
			var aM = this.SourceElements(), aL, aI = [], aK, aJ, aH;
			for (aH = 0; aH <= this.repeatTags; ++aH) {
					for (aK = 0; aK < aM.length; ++aK) {
							aL = aM[aK].getElementsByTagName("a");
							for (aJ = 0; aJ < aL.length; ++aJ) {
									aI.push(aL[aJ])
							}
					}
			}
			return aI
	}
	;
	Q.Message = function(aM) {
			var aO = [], aI, j, aH = aM.split(""), aK, aN, aL, aJ;
			for (aI = 0; aI < aH.length; ++aI) {
					if (aH[aI] != " ") {
							j = aI - aH.length / 2;
							aK = C.createElement("A");
							aK.href = "#";
							aK.innerText = aH[aI];
							aL = 100 * ah(j / 9);
							aJ = -100 * w(j / 9);
							aN = new e(this,aH[aI],aK,[aL, 0, aJ],2,18,"#000","#fff",0,0,0,"monospace",2,aH[aI]);
							aN.Init();
							aO.push(aN)
					}
			}
			return aO
	}
	;
	Q.CreateTag = function(aL) {
			var aO, aJ, aP, aK, aN, aH, aM, aI, j = [0, 0, 0];
			if ("text" != this.imageMode) {
					aO = aL.getElementsByTagName("img");
					if (aO.length) {
							aJ = new Image;
							aJ.src = aO[0].src;
							if (!this.imageMode) {
									aP = new e(this,"",aL,j,0,0);
									aP.SetImage(aJ);
									aw(aJ, aO[0], aP, this);
									return aP
							}
					}
			}
			if ("image" != this.imageMode) {
					aN = new aB(aL);
					aK = aN.Lines();
					if (!aN.Empty()) {
							aH = this.textFont || o(Y(aL, "font-family"));
							if (this.splitWidth) {
									aK = aN.SplitWidth(this.splitWidth, this.ctxt, aH, this.textHeight)
							}
							aM = this.bgColour == "tag" ? Y(aL, "background-color") : this.bgColour;
							aI = this.bgOutline == "tag" ? Y(aL, "color") : this.bgOutline
					} else {
							aN = null
					}
			}
			if (aN || aJ) {
					aP = new e(this,aK,aL,j,2,this.textHeight + 2,this.textColour || Y(aL, "color"),aM,this.bgRadius,aI,this.bgOutlineThickness,aH,this.padding,aN && aN.original);
					if (aJ) {
							aP.SetImage(aJ);
							aw(aJ, aO[0], aP, this)
					} else {
							aP.Init()
					}
					return aP
			}
	}
	;
	Q.UpdateTag = function(aH, i) {
			var aK = this.textColour || Y(i, "color")
				, j = this.textFont || o(Y(i, "font-family"))
				, aJ = this.bgColour == "tag" ? Y(i, "background-color") : this.bgColour
				, aI = this.bgOutline == "tag" ? Y(i, "color") : this.bgOutline;
			aH.a = i;
			aH.title = i.title;
			if (aH.colour != aK || aH.textFont != j || aH.bgColour != aJ || aH.bgOutline != aI) {
					aH.SetFont(j, aK, aJ, aI)
			}
	}
	;
	Q.Weight = function(aN) {
			var aJ = aN.length, aL, aH, aO, aK = [], j, aI = this.weightFrom ? this.weightFrom.split(/[, ]/) : [null], aM = aI.length;
			for (aH = 0; aH < aJ; ++aH) {
					aK[aH] = [];
					for (aO = 0; aO < aM; ++aO) {
							aL = u(aN[aH].a, aI[aO], this.textHeight);
							if (!this.max_weight[aO] || aL > this.max_weight[aO]) {
									this.max_weight[aO] = aL
							}
							if (!this.min_weight[aO] || aL < this.min_weight[aO]) {
									this.min_weight[aO] = aL
							}
							aK[aH][aO] = aL
					}
			}
			for (aO = 0; aO < aM; ++aO) {
					if (this.max_weight[aO] > this.min_weight[aO]) {
							j = 1
					}
			}
			if (j) {
					for (aH = 0; aH < aJ; ++aH) {
							aN[aH].SetWeight(aK[aH])
					}
			}
	}
	;
	Q.Load = function() {
			var aR = this.GetTags(), aM = [], aP, aQ, aL, aI, aH, j, aJ, aO, aK = [], aN = {
					sphere: q,
					vcylinder: am,
					hcylinder: au,
					vring: d,
					hring: n
			};
			if (aR.length) {
					aK.length = aR.length;
					for (aO = 0; aO < aR.length; ++aO) {
							aK[aO] = aO
					}
					this.shuffleTags && an(aK);
					aI = 100 * this.radiusX;
					aH = 100 * this.radiusY;
					j = 100 * this.radiusZ;
					this.max_radius = s(aI, s(aH, j));
					for (aO = 0; aO < aR.length; ++aO) {
							aQ = this.CreateTag(aR[aK[aO]]);
							if (aQ) {
									aM.push(aQ)
							}
					}
					this.weight && this.Weight(aM, true);
					if (this.shapeArgs) {
							this.shapeArgs[0] = aM.length
					} else {
							aL = this.shape.toString().split(/[(),]/);
							aP = aL.shift();
							if (typeof window[aP] === "function") {
									this.shape = window[aP]
							} else {
									this.shape = aN[aP] || aN.sphere
							}
							this.shapeArgs = [aM.length, aI, aH, j].concat(aL)
					}
					aJ = this.shape.apply(this, this.shapeArgs);
					this.listLength = aM.length;
					for (aO = 0; aO < aM.length; ++aO) {
							aM[aO].position = new ae(aJ[aO][0],aJ[aO][1],aJ[aO][2])
					}
			}
			if (this.noTagsMessage && !aM.length) {
					aO = (this.imageMode && this.imageMode != "both" ? this.imageMode + " " : "");
					aM = this.Message("No " + aO + "tags")
			}
			this.taglist = aM
	}
	;
	Q.Update = function() {
			var aQ = this.GetTags(), aP = [], aK = this.taglist, aR, aO = [], aM = [], aI, aN, aH, aL, aJ;
			if (!this.shapeArgs) {
					return this.Load()
			}
			if (aQ.length) {
					aH = this.listLength = aQ.length;
					aN = aK.length;
					for (aL = 0; aL < aN; ++aL) {
							aP.push(aK[aL]);
							aM.push(aL)
					}
					for (aL = 0; aL < aH; ++aL) {
							for (aJ = 0,
							aR = 0; aJ < aN; ++aJ) {
									if (aK[aJ].EqualTo(aQ[aL])) {
											this.UpdateTag(aP[aJ], aQ[aL]);
											aR = aM[aJ] = -1
									}
							}
							if (!aR) {
									aO.push(aL)
							}
					}
					for (aL = 0,
					aJ = 0; aL < aN; ++aL) {
							if (aM[aJ] == -1) {
									aM.splice(aJ, 1)
							} else {
									++aJ
							}
					}
					if (aM.length) {
							an(aM);
							while (aM.length && aO.length) {
									aL = aM.shift();
									aJ = aO.shift();
									aP[aL] = this.CreateTag(aQ[aJ])
							}
							aM.sort(function(j, i) {
									return j - i
							});
							while (aM.length) {
									aP.splice(aM.pop(), 1)
							}
					}
					aJ = aP.length / (aO.length + 1);
					aL = 0;
					while (aO.length) {
							aP.splice(ap(++aL * aJ), 0, this.CreateTag(aQ[aO.shift()]))
					}
					this.shapeArgs[0] = aH = aP.length;
					aI = this.shape.apply(this, this.shapeArgs);
					for (aL = 0; aL < aH; ++aL) {
							aP[aL].position = new ae(aI[aL][0],aI[aL][1],aI[aL][2])
					}
					this.weight && this.Weight(aP)
			}
			this.taglist = aP
	}
	;
	Q.SetShadow = function(i) {
			i.shadowBlur = this.shadowBlur;
			i.shadowOffsetX = this.shadowOffset[0];
			i.shadowOffsetY = this.shadowOffset[1]
	}
	;
	Q.Draw = function(aR) {
			if (this.paused) {
					return
			}
			var aL = this.canvas, aJ = aL.width, aQ = aL.height, aT = 0, aI = (aR - this.time) * y.interval / 1000, aP = aJ / 2 + this.offsetX, aO = aQ / 2 + this.offsetY, aX = this.ctxt, aN, aY, aV, aH = -1, aK = this.taglist, aU = aK.length, j = this.frontSelect, aS = (this.centreFunc == aA), aM;
			this.time = aR;
			if (this.frozen && this.drawn) {
					return this.Animate(aJ, aQ, aI)
			}
			aM = this.AnimateFixed();
			aX.setTransform(1, 0, 0, 1, 0, 0);
			for (aV = 0; aV < aU; ++aV) {
					aK[aV].Calc(this.transform, this.fixedAlpha)
			}
			aK = A(aK, function(aZ, i) {
					return i.z - aZ.z
			});
			if (aM && this.fixedAnim.active) {
					aN = this.fixedAnim.tag.UpdateActive(aX, aP, aO)
			} else {
					this.active = null;
					for (aV = 0; aV < aU; ++aV) {
							aY = this.mx >= 0 && this.my >= 0 && this.taglist[aV].CheckActive(aX, aP, aO);
							if (aY && aY.sc > aT && (!j || aY.z <= 0)) {
									aN = aY;
									aH = aV;
									aN.tag = this.taglist[aV];
									aT = aY.sc
							}
					}
					this.active = aN
			}
			this.txtOpt || (this.shadow && this.SetShadow(aX));
			aX.clearRect(0, 0, aJ, aQ);
			for (aV = 0; aV < aU; ++aV) {
					if (!aS && aK[aV].z <= 0) {
							try {
									this.centreFunc(aX, aJ, aQ, aP, aO)
							} catch (aW) {
									alert(aW);
									this.centreFunc = aA
							}
							aS = true
					}
					if (!(aN && aN.tag == aK[aV] && aN.PreDraw(aX, aK[aV], aP, aO))) {
							aK[aV].Draw(aX, aP, aO)
					}
					aN && aN.tag == aK[aV] && aN.PostDraw(aX)
			}
			if (this.freezeActive && aN) {
					this.Freeze()
			} else {
					this.UnFreeze();
					this.drawn = (aU == this.listLength)
			}
			if (this.fixedCallback) {
					this.fixedCallback(this, this.fixedCallbackTag);
					this.fixedCallback = null
			}
			aM || this.Animate(aJ, aQ, aI);
			aN && aN.LastDraw(aX);
			aL.style.cursor = aN ? this.activeCursor : "";
			this.Tooltip(aN, this.taglist[aH])
	}
	;
	Q.TooltipNone = function() {}
	;
	Q.TooltipNative = function(j, i) {
			if (j) {
					this.canvas.title = i && i.title ? i.title : ""
			} else {
					this.canvas.title = this.ctitle
			}
	}
	;
	Q.SetTTDiv = function(aI, j) {
			var i = this
				, aH = i.ttdiv.style;
			if (aI != i.ttdiv.innerHTML) {
					aH.display = "none"
			}
			i.ttdiv.innerHTML = aI;
			j && (j.title = i.ttdiv.innerHTML);
			if (aH.display == "none" && !i.tttimer) {
					i.tttimer = setTimeout(function() {
							var aJ = ab(i.canvas.id);
							aH.display = "block";
							aH.left = aJ.x + i.mx + "px";
							aH.top = aJ.y + i.my + 24 + "px";
							i.tttimer = null
					}, i.tooltipDelay)
			}
	}
	;
	Q.TooltipDiv = function(j, i) {
			if (j && i && i.title) {
					this.SetTTDiv(i.title, i)
			} else {
					if (!j && this.mx != -1 && this.my != -1 && this.ctitle.length) {
							this.SetTTDiv(this.ctitle)
					} else {
							this.ttdiv.style.display = "none"
					}
			}
	}
	;
	Q.Transform = function(aK, i, aM) {
			if (i || aM) {
					var j = ah(i)
						, aL = w(i)
						, aN = ah(aM)
						, aJ = w(aM)
						, aH = new R([aJ, 0, aN, 0, 1, 0, -aN, 0, aJ])
						, aI = new R([1, 0, 0, 0, aL, -j, 0, j, aL]);
					aK.transform = aK.transform.mul(aH.mul(aI))
			}
	}
	;
	Q.AnimateFixed = function() {
			var aH, j, aJ, i, aI;
			if (this.fadeIn) {
					j = G() - this.startTime;
					if (j >= this.fadeIn) {
							this.fadeIn = 0;
							this.fixedAlpha = 1
					} else {
							this.fixedAlpha = j / this.fadeIn
					}
			}
			if (this.fixedAnim) {
					if (!this.fixedAnim.transform) {
							this.fixedAnim.transform = this.transform
					}
					aH = this.fixedAnim,
					j = G() - aH.t0,
					aJ = aH.angle,
					i,
					aI = this.animTiming(aH.t, j);
					this.transform = aH.transform;
					if (j >= aH.t) {
							this.fixedCallbackTag = aH.tag;
							this.fixedCallback = aH.cb;
							this.fixedAnim = this.yaw = this.pitch = 0
					} else {
							aJ *= aI
					}
					i = R.Rotation(aJ, aH.axis);
					this.transform = this.transform.mul(i);
					return (this.fixedAnim != 0)
			}
			return false
	}
	;
	Q.AnimatePosition = function(aH, aK, aI) {
			var j = this, i = j.mx, aM = j.my, aJ, aL;
			if (!j.frozen && i >= 0 && aM >= 0 && i < aH && aM < aK) {
					aJ = j.maxSpeed,
					aL = j.reverse ? -1 : 1;
					j.lx || (j.yaw = ((i * 2 * aJ / aH) - aJ) * aL * aI);
					j.ly || (j.pitch = ((aM * 2 * aJ / aK) - aJ) * -aL * aI);
					j.initial = null
			} else {
					if (!j.initial) {
							if (j.frozen && !j.freezeDecel) {
									j.yaw = j.pitch = 0
							} else {
									j.Decel(j)
							}
					}
			}
			this.Transform(j, j.pitch, j.yaw)
	}
	;
	Q.AnimateDrag = function(j, aJ, aI) {
			var i = this
				, aH = 100 * aI * i.maxSpeed / i.max_radius / i.zoom;
			if (i.dx || i.dy) {
					i.lx || (i.yaw = i.dx * aH / i.stretchX);
					i.ly || (i.pitch = i.dy * -aH / i.stretchY);
					i.dx = i.dy = 0;
					i.initial = null
			} else {
					if (!i.initial) {
							i.Decel(i)
					}
			}
			this.Transform(i, i.pitch, i.yaw)
	}
	;
	Q.Freeze = function() {
			if (!this.frozen) {
					this.preFreeze = [this.yaw, this.pitch];
					this.frozen = 1;
					this.drawn = 0
			}
	}
	;
	Q.UnFreeze = function() {
			if (this.frozen) {
					this.yaw = this.preFreeze[0];
					this.pitch = this.preFreeze[1];
					this.frozen = 0
			}
	}
	;
	Q.Decel = function(i) {
			var aH = i.minSpeed
				, aI = L(i.yaw)
				, j = L(i.pitch);
			if (!i.lx && aI > aH) {
					i.yaw = aI > i.z0 ? i.yaw * i.decel : 0
			}
			if (!i.ly && j > aH) {
					i.pitch = j > i.z0 ? i.pitch * i.decel : 0
			}
	}
	;
	Q.Zoom = function(i) {
			this.z2 = this.z1 * (1 / i);
			this.drawn = 0
	}
	;
	Q.Clicked = function(aH) {
			var i = this.active;
			try {
					if (i && i.tag) {
							if (this.clickToFront === false || this.clickToFront === null) {
									i.tag.Clicked(aH)
							} else {
									this.TagToFront(i.tag, this.clickToFront, function() {
											i.tag.Clicked(aH)
									}, true)
							}
					}
			} catch (j) {}
	}
	;
	Q.Wheel = function(j) {
			var aH = this.zoom + this.zoomStep * (j ? 1 : -1);
			this.zoom = aD(this.zoomMax, s(this.zoomMin, aH));
			this.Zoom(this.zoom)
	}
	;
	Q.BeginDrag = function(i) {
			this.down = S(i, this.canvas);
			i.cancelBubble = true;
			i.returnValue = false;
			i.preventDefault && i.preventDefault()
	}
	;
	Q.Drag = function(aJ, aI) {
			if (this.dragControl && this.down) {
					var aH = this.dragThreshold * this.dragThreshold
						, j = aI.x - this.down.x
						, i = aI.y - this.down.y;
					if (this.dragging || j * j + i * i > aH) {
							this.dx = j;
							this.dy = i;
							this.dragging = 1;
							this.down = aI
					}
			}
			return this.dragging
	}
	;
	Q.EndDrag = function() {
			var i = this.dragging;
			this.dragging = this.down = null;
			return i
	}
	;
	function D(aH) {
			var j = aH.targetTouches[0]
				, i = aH.targetTouches[1];
			return F(at(i.pageX - j.pageX, 2) + at(i.pageY - j.pageY, 2))
	}
	Q.BeginPinch = function(i) {
			this.pinched = [D(i), this.zoom];
			i.preventDefault && i.preventDefault()
	}
	;
	Q.Pinch = function(j) {
			var aI, aH, i = this.pinched;
			if (!i) {
					return
			}
			aH = D(j);
			aI = i[1] * aH / i[0];
			this.zoom = aD(this.zoomMax, s(this.zoomMin, aI));
			this.Zoom(this.zoom)
	}
	;
	Q.EndPinch = function(i) {
			this.pinched = null
	}
	;
	Q.Pause = function() {
			this.paused = true
	}
	;
	Q.Resume = function() {
			this.paused = false
	}
	;
	Q.SetSpeed = function(j) {
			this.initial = j;
			this.yaw = j[0] * this.maxSpeed;
			this.pitch = j[1] * this.maxSpeed
	}
	;
	Q.FindTag = function(aH) {
			if (!ai(aH)) {
					return null
			}
			ai(aH.index) && (aH = aH.index);
			if (!I(aH)) {
					return this.taglist[aH]
			}
			var aI, aJ, j;
			if (ai(aH.id)) {
					aI = "id",
					aJ = aH.id
			} else {
					if (ai(aH.text)) {
							aI = "innerText",
							aJ = aH.text
					}
			}
			for (j = 0; j < this.taglist.length; ++j) {
					if (this.taglist[j].a[aI] == aJ) {
							return this.taglist[j]
					}
			}
	}
	;
	Q.RotateTag = function(aP, aI, aO, i, aM, aH) {
			var aN = aP.Calc(this.transform, 1)
				, aK = new ae(aN.x,aN.y,aN.z)
				, aJ = aj(aO, aI)
				, j = aK.angle(aJ)
				, aL = aK.cross(aJ).unit();
			if (j == 0) {
					this.fixedCallbackTag = aP;
					this.fixedCallback = aM
			} else {
					this.fixedAnim = {
							angle: -j,
							axis: aL,
							t: i,
							t0: G(),
							cb: aM,
							tag: aP,
							active: aH
					}
			}
	}
	;
	Q.TagToFront = function(i, aH, aI, j) {
			this.RotateTag(i, 0, 0, aH, aI, j)
	}
	;
	y.Start = function(aH, i, j) {
			y.Delete(aH);
			y.tc[aH] = new y(aH,i,j)
	}
	;
	function ay(i, j) {
			y.tc[j] && y.tc[j][i]()
	}
	y.Linear = function(i, j) {
			return j / i
	}
	;
	y.Smooth = function(i, j) {
			return 0.5 - w(j * Math.PI / i) / 2
	}
	;
	y.Pause = function(i) {
			ay("Pause", i)
	}
	;
	y.Resume = function(i) {
			ay("Resume", i)
	}
	;
	y.Reload = function(i) {
			ay("Load", i)
	}
	;
	y.Update = function(i) {
			ay("Update", i)
	}
	;
	y.SetSpeed = function(j, i) {
			if (I(i) && y.tc[j] && !isNaN(i[0]) && !isNaN(i[1])) {
					y.tc[j].SetSpeed(i);
					return true
			}
			return false
	}
	;
	y.TagToFront = function(j, i) {
			if (!I(i)) {
					return false
			}
			i.lat = i.lng = 0;
			return y.RotateTag(j, i)
	}
	;
	y.RotateTag = function(aH, i) {
			if (I(i) && y.tc[aH]) {
					if (isNaN(i.time)) {
							i.time = 500
					}
					var j = y.tc[aH].FindTag(i);
					if (j) {
							y.tc[aH].RotateTag(j, i.lat, i.lng, i.time, i.callback, i.active);
							return true
					}
			}
			return false
	}
	;
	y.Delete = function(aI) {
			var j, aH;
			if (b[aI]) {
					aH = C.getElementById(aI);
					if (aH) {
							for (j = 0; j < b[aI].length; ++j) {
									a(b[aI][j][0], b[aI][j][1], aH)
							}
					}
			}
			delete b[aI];
			delete y.tc[aI]
	}
	;
	y.NextFrameRAF = function() {
			requestAnimationFrame(E)
	}
	;
	y.NextFrameTimeout = function(i) {
			setTimeout(O, i)
	}
	;
	y.tc = {};
	y.options = {
			z1: 20000,
			z2: 20000,
			z0: 0.0002,
			freezeActive: false,
			freezeDecel: false,
			activeCursor: "pointer",
			pulsateTo: 1,
			pulsateTime: 3,
			reverse: false,
			depth: 0.5,
			maxSpeed: 0.05,
			minSpeed: 0,
			decel: 0.95,
			interval: 20,
			minBrightness: 0.1,
			maxBrightness: 1,
			outlineColour: "#ffff99",
			outlineThickness: 2,
			outlineOffset: 5,
			outlineMethod: "outline",
			outlineRadius: 0,
			textColour: "#ff99ff",
			textHeight: 15,
			textFont: "Helvetica, Arial, sans-serif",
			shadow: "#000",
			shadowBlur: 0,
			shadowOffset: [0, 0],
			initial: null,
			hideTags: true,
			zoom: 1,
			weight: false,
			weightMode: "size",
			weightFrom: null,
			weightSize: 1,
			weightSizeMin: null,
			weightSizeMax: null,
			weightGradient: {
					0: "#f00",
					0.33: "#ff0",
					0.66: "#0f0",
					1: "#00f"
			},
			txtOpt: true,
			txtScale: 2,
			frontSelect: false,
			wheelZoom: true,
			zoomMin: 0.3,
			zoomMax: 3,
			zoomStep: 0.05,
			shape: "sphere",
			lock: null,
			tooltip: null,
			tooltipDelay: 300,
			tooltipClass: "tctooltip",
			radiusX: 1,
			radiusY: 1,
			radiusZ: 1,
			stretchX: 1,
			stretchY: 1,
			offsetX: 0,
			offsetY: 0,
			shuffleTags: false,
			noSelect: false,
			noMouse: false,
			imageScale: 1,
			paused: false,
			dragControl: false,
			dragThreshold: 4,
			centreFunc: aA,
			splitWidth: 0,
			animTiming: "Smooth",
			clickToFront: false,
			fadeIn: 0,
			padding: 0,
			bgColour: null,
			bgRadius: 0,
			bgOutline: null,
			bgOutlineThickness: 0,
			outlineIncrease: 4,
			textAlign: "centre",
			textVAlign: "middle",
			imageMode: null,
			imagePosition: null,
			imagePadding: 2,
			imageAlign: "centre",
			imageVAlign: "middle",
			noTagsMessage: true,
			centreImage: null,
			pinchZoom: false,
			repeatTags: 0,
			minTags: 0,
			imageRadius: 0,
			scrollPause: false,
			outlineDash: 0,
			outlineDashSpace: 0,
			outlineDashSpeed: 1
	};
	for (M in y.options) {
			y[M] = y.options[M]
	}
	window.TagCanvas = y;
	ad("load", function() {
			y.loaded = 1
	}, window)
}
)();
