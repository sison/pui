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
		'icon-gou': '&#xe908;',
		'icon-announce': '&#xe907;',
		'icon-folder': '&#xe911;',
		'icon-treest': '&#xe912;',
		'icon-peoples': '&#xe913;',
		'icon-report2': '&#xe916;',
		'icon-report': '&#xe91a;',
		'icon-qq': '&#xe918;',
		'icon-tel': '&#xe91d;',
		'icon-password': '&#xe919;',
		'icon-username': '&#xe923;',
		'icon-project-psy': '&#xe90a;',
		'icon-project-360': '&#xe909;',
		'icon-survey': '&#xe95d;',
		'icon-wx-waiting': '&#xe954;',
		'icon-wx-success': '&#xe952;',
		'icon-wx-fail': '&#xe953;',
		'icon-question-full': '&#xe936;',
		'icon-date2': '&#xe94f;',
		'icon-add': '&#xe90f;',
		'icon-arrow-down2': '&#xe94b;',
		'icon-arrow-up2': '&#xe94c;',
		'icon-people': '&#xe910;',
		'icon-ellipsis-round': '&#xe926;',
		'icon-add1': '&#xe928;',
		'icon-edit': '&#xe929;',
		'icon-arrow-upper': '&#xe92a;',
		'icon-arrow-donwer': '&#xe92b;',
		'icon-delete': '&#xe92c;',
		'icon-set-card': '&#xe92d;',
		'icon-set-info': '&#xe92f;',
		'icon-mail-waiting': '&#xe930;',
		'icon-mail-success': '&#xe931;',
		'icon-mail-fail': '&#xe932;',
		'icon-msg-waiting': '&#xe933;',
		'icon-msg-success': '&#xe934;',
		'icon-msg-fail': '&#xe935;',
		'icon-flag-full': '&#xe93e;',
		'icon-close-round': '&#xe941;',
		'icon-resolve-full': '&#xe945;',
		'icon-resume': '&#xe947;',
		'icon-computer': '&#xe948;',
		'icon-date': '&#xe949;',
		'icon-ellipsis': '&#xe90b;',
		'icon-resolve': '&#xe90c;',
		'icon-member2': '&#xe903;',
		'icon-close': '&#xe904;',
		'icon-sign-full': '&#xe959;',
		'icon-addr': '&#xe906;',
		'icon-search': '&#xe902;',
		'icon-member1': '&#xe901;',
		'icon-member3': '&#xe900;',
		'icon-star-full': '&#xe905;',
		'icon-newspaper': '&#xe91b;',
		'icon-pencil2': '&#xe91e;',
		'icon-shocked2': '&#xe9f2;',
		'icon-baffled': '&#xe9f3;',
		'icon-to-top': '&#xea50;',
		'icon-ding-fail': '&#xe9e5;',
		'icon-ding-success': '&#xe9eb;',
		'icon-ding-waiting': '&#xe9fd;',
		'icon-phone': '&#xe95b;',
		'icon-mail': '&#xe95c;',
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
