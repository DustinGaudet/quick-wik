function getSearchResults(searchParams){
  searchParams = encodeURI(searchParams).split('%20').join('+')

  var url = 'https://en.wikipedia.org/w/api.php?action=query' + 
    '&format=json' + 
    '&prop=extracts%7Clinks%7Cinfo' + 
    '&generator=search' + 
    '&inprop=url' +
    '&generator=search' + 
    '&exsentences=1' +
    '&exlimit=max' +
    '&exintro=1' +
    '&explaintext=1' +
    '&exsectionformat=plain' +
    '&gsrsearch=' + searchParams +
    '&gsrlimit=10' +
    '&origin=*'

  $.ajax({
    url: url,
    dataType: 'json',
    type: 'GET',
    headers: { 'Api-User-Agent': 'Example/1.0' },
    success: function(data) {
      console.log(data)
      if (!data.hasOwnProperty('query')){ 
        $('#accordion').text('Sorry, no matches were found.') 
        return
      }
      
      $.each(data.query.pages, function(key, val){
        // .wiki-entry > h2 + p + a
        
        var tab = $('<div class="panel-heading" role="tab" id="heading' + key + '">' +
                      '<h4 class="panel-title">' +
                        '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' + key + '" aria-expanded="false" aria-controls="collapse' + key + '">' +
                          val.title +
                        '</a>' +
                      '</h4>' +
                    '</div>')
        
        var tabPanel = $('<div id="collapse' + key + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + key + '">' + 
                            '<div class="panel-body">' +
                              val.extract +
                              '<br><a class="btn btn-default pull-right" href="' + val.fullurl + '">See Page <i class="glyphicon glyphicon-arrow-right"></i></a>' + 
                            '</div>' +
                          '</div>')        
        
        var panel = $('<div class="panel panel-default animated fadeInUp"></div>').append(tab).append(tabPanel)
        
        $('#accordion').append(panel)
      })
    }
  }) // $.ajax
}

$(document).ready(function(){
  $('#search-form').on('submit', function(e){
    e.preventDefault()
    $('#accordion').empty()
    var query = $('input').val()
    console.log(query)
    getSearchResults(query)
  })
  
  $('form').on('submit', function(e){
    e.preventDefault()
    e.target.getElementsByTagName('input')[0].select()
  })
  
  $('input').on('blur', function(e){
    e.target.value = ''
  })
  
})