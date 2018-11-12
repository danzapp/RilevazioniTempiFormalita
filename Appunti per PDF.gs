// funzione per pubblicazione documenti PDF da Google Drive su Sites
// origine: http://www.benschersten.com/blog/2014/04/embedding-a-pdf-from-drive-into-a-blog/
// Shortcode: pdf-iframe
function embed_pdf( $atts ) {
      extract( shortcode_atts(
        array(
          url = '',
          width = '100%',
          height = 768
          ), 
        $atts )
      );
        $output = ''

      return $output;
    }
//  add_shortcode( 'pdf-iframe', 'embed_pdf' );

// And a bit of css:

//  div.pdf-iframe-holder {
//        display: block;
//        width: 100%;
//        height: 100%;
//        margin-top: 1.2308em;
//        position: relative;
//        top: 0;
//        bottom: 0;
//        }
//  iframe.pdf-iframe{
//        width: 100%;
//        position: absolute;
//        top: 0;
//        bottom: 0;
//        }

//  Which can then be used in post-editing as such: [pdf-iframe url=”some pdf-preview url from Google docs” width=”100%” height=”768″]. 
//  It made it much easier to have a page to show documents from my Google docs in my WordPress blog.

// ----------- metodo tradizionale HTML ------------------

// <iframe src="https://docs.google.com/viewer?srcid=[put your file id here]&pid=explorer&efh=false&a=v&chrome=false&embedded=true" width="580px" height="480px"></iframe>