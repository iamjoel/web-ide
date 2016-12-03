  $(document).ready(function() {
    var htmlEditor = CodeMirror.fromTextArea(document.querySelector('#html'), {
      lineNumbers: true,
      mode: 'text/html'
    });
    var cssEditor = CodeMirror.fromTextArea(document.querySelector('#css'), {
      lineNumbers: true,
      mode: "css",
    });
    var jsEditor = CodeMirror.fromTextArea(document.querySelector('#js'), {
      lineNumbers: true,
      mode: "javascript",
    });


      // 总共内容占1屏
    var $preview = $('#preview')
    var bodyHeight = $(window).height()
    var preHeight = bodyHeight 
      - $('.header').outerHeight()
      - $('.code-wrap').outerHeight()
      - $('.panel__title').outerHeight()

    $preview.height(preHeight)


    var previewEl = $preview[0]
    $('#run-btn').click(run)
    run()

    function run() {
      var html = htmlEditor.getValue()
      var style = cssEditor.getValue()
      var js = jsEditor.getValue()
      var res = generatorHTML({
        html: html,
        style: style,
        js: js
      })
      var preview = previewEl.contentDocument || previewEl.contentWindow.document;
      preview.open();
      preview.write(res);
      preview.close()
    }

    function generatorHTML(opts) {
      opts = Object.assign({
        html: '',
        style: '',
        js: ''
      }, opts)
        var html =
          `
          <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Document</title>
              <style>
              ${opts.style}
              </style>
            </head>
            <body>
              ${opts.html}
              <script>
                ${opts.js}
              <\/script>
            </body>
          </html>
        `
      return html
    }
  })
