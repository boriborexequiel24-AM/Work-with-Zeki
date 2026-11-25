# CV

`cv.html` is the source of `public/Exequiel-Boribor-CV.pdf`, the file the site links to. It has to stay on one A4 page.

After editing it, make the PDF again from the project folder (PowerShell):

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --no-pdf-header-footer --print-to-pdf="$PWD\public\Exequiel-Boribor-CV.pdf" "$PWD\docs\cv\cv.html"
```

Past client work is under NDA, so there are no client names here. Numbers are either measured in a project's own repo or marked as an estimate.
