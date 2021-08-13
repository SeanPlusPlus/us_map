$( document ).ready(function() {
  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(ios) {
    $('a').on('click touchend', function() { 
      var link = $(this).attr('href'); 
      window.open(link,'_blank');
      return false;
    });
  }

  var url = "/data.json";
  $.get(url , function(response) {
    var states = response.states.map(getStates).join(''),
      dc = getDc(response.dc),
      usa = states + dc;
    $("#usa").html(usa);
  })
  .done(function() {
    $("path, circle").hover(function(e) {
      $('#info-box').css('display','block');
      $('#info-box').html($(this).data('info'));
    });

    $("path, circle").mouseleave(function(e) {
      $('#info-box').css('display','none');
    });

    $(document).mousemove(function(e) {
      $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
      $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
    }).mouseover();

  })

  function getStates(data) {
    var data_info = `<div>${data.data.name} [ Capital: ${data.data.capital} ]</div>`;
    return `<path
              id="${data.id}"
              data-info="${data_info}"
              fill="${data.fill}"
              d="${data.d}"
            />`
  }

  function getDc(data) {
    var path = data.path,
      circle = data.circle;

    return `
      <g id="DC">
        <path
          id="${path.id}"
          fill="${path.fill}"
          d="${path.d}
        "/>
        <circle
          id="${circle.id}"
          data-info="${circle.data.name}"
          fill="${circle.fill}"
          stroke="${circle.stroke}"
          stroke-width="${circle.stroke_width}"
          cx="${circle.cx}"
          cy="${circle.cy}"
          r="${circle.r}"
        />
      </g>
    `;
  }
});