/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-log': '&#xe900;',
		'icon-Road': '&#xe901;',
		'icon-full': '&#xe902;',
		'icon-video-a': '&#xe903;',
		'icon-Police-t': '&#xe907;',
		'icon-cloud-volume': '&#xe908;',
		'icon-print': '&#xe909;',
		'icon-post': '&#xe90a;',
		'icon-close-s': '&#xe90b;',
		'icon-close-tip': '&#xe90c;',
		'icon-aperture': '&#xe90d;',
		'icon-playback': '&#xe90e;',
		'icon-analysis': '&#xe90f;',
		'icon-focal': '&#xe910;',
		'icon-lens': '&#xe911;',
		'icon-video': '&#xe912;',
		'icon-bolt': '&#xe913;',
		'icon-ballmill': '&#xe914;',
		'icon-setup': '&#xe915;',
		'icon-Real-time': '&#xe916;',
		'icon-video-wall': '&#xe917;',
		'icon-Pack-up': '&#xe918;',
		'icon-refresh': '&#xe919;',
		'icon-search': '&#xe91a;',
		'icon-Log-out': '&#xe91b;',
		'icon-information': '&#xe91c;',
		'icon-system': '&#xe91d;',
		'icon-User-groups': '&#xe91e;',
		'icon-voice': '&#xe91f;',
		'icon-Voice-volume': '&#xe920;',
		'icon-yuntai': '&#xe922;',
		'icon-zhankai': '&#xe923;',
		'icon-snap': '&#xe924;',
		'icon-organization': '&#xe925;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
