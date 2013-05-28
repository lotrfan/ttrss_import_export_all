function exportAllData() {
	try {

		var query = "backend.php?op=pluginhandler&plugin=import_export_all&method=exportData";

		if (dijit.byId("dataExportAllDlg"))
			dijit.byId("dataExportAllDlg").destroyRecursive();

		var exported = 0;
		var total = 0;

		dialog = new dijit.Dialog({
			id: "dataExportAllDlg",
			title: __("Export Data"),
			style: "width: 600px",
			prepare: function() {

				notify_progress("Loading, please wait...");

				new Ajax.Request("backend.php", {
					parameters: "op=pluginhandler&plugin=import_export_all&method=exportrun&offset=" + exported,
					onComplete: function(transport) {
						try {
							var rv = JSON.parse(transport.responseText);

							if (rv && rv.total != undefined && rv.total > 0) {
								total = rv.total;
							}

							if (rv && rv.exported != undefined) {
								if (rv.exported > 0) {

									exported += rv.exported;

									$("export_all_status_message").innerHTML =
										"<img src='images/indicator_tiny.gif'> " +
										"Exported %d of %t articles, please wait...".replace("%d",
											exported).replace("%t", total);

									setTimeout('dijit.byId("dataExportAllDlg").prepare()', 1000);

								} else {

									$("export_all_status_message").innerHTML =
										ngettext("Finished, exported %d article. You can download the data <a class='visibleLink' href='%u'>here</a>.", "Finished, exported %d articles. You can download the data <a class='visibleLink' href='%u'>here</a>.", exported)
										.replace("%d", exported)
										.replace("%u", "backend.php?op=pluginhandler&plugin=import_export_all&subop=exportget");

									exported = 0;

								}

							} else {
								$("export_all_status_message").innerHTML =
									"Error occured, could not export data.";
							}
						} catch (e) {
							exception_error("exportAllData", e, transport.responseText);
						}

						notify('');

					} });

			},
			execute: function() {
				if (this.validate()) {



				}
			},
			href: query});

		dialog.show();


	} catch (e) {
		exception_error("exportAllData", e);
	}
}

function dataImportAllComplete(iframe) {
	try {
		if (!iframe.contentDocument.body.innerHTML) return false;

		Element.hide(iframe);

		notify('');

		if (dijit.byId('dataImportAllDlg'))
			dijit.byId('dataImportAllDlg').destroyRecursive();

		var content = iframe.contentDocument.body.innerHTML;

		dialog = new dijit.Dialog({
			id: "dataImportAllDlg",
			title: __("Data Import"),
			style: "width: 600px",
			onCancel: function() {

			},
			content: content});

		dialog.show();

	} catch (e) {
		exception_error("dataImportAllComplete", e);
	}
}

function importAllData() {

	var file = $("export_all_file");

	if (file.value.length == 0) {
		alert(__("Please choose the file first."));
		return false;
	} else {
		notify_progress("Importing, please wait...", true);

		Element.show("data_upload_all_iframe");

		return true;
	}
}


