var iframe = $("#poster"),
    message = {
        command: "issueTemplate",
        context: JSON.parse(localStorage.getItem("webContacts"))
    };
    iframe.on("load", function() {
        if ( message.context ) {
            iframe[0].contentWindow.postMessage(message, "*");
        } else {
            $("<li>", {text: "No contacts added yet"}).appendTo($("#contacts"));
        }
    });

window.addEventListener("message", function(e) {
    $("#contacts").append(e.data.markup);
});