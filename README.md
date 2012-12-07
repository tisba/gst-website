# Benutzung

Liste aller Auphonic Produktionen holen:

     gst-kitchen list

Dann die UUID von der neuen Episode kopieren und folgendes ausführen:

     gst-kitchen process --uuid=<PRODUCTION-UUID>

Es sollte nun eine neue YAML-Datei unter `episodes/` geben.

Nun muss nur noch der Feed aktualisiert werden:

    gst-kitchen feed

Über die Changes schauen, commit, push, `rake deploy` und fertig!

