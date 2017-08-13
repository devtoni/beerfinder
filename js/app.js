/* global $ */

const searchForm = $('#search-beer')
const select = $('#list-beers')

searchForm.on('submit', function (e) {
  e.preventDefault()
  const value = $(this).find('input').val()
  getData(value)
})

select.on('change', function () {
  const id = $(this).val()
  getBeer(id)
})

/// getData from Brand
function getData (brand) {
  const url = `https://quiet-inlet-67115.herokuapp.com/api/search/all?q=${brand}`
  $.ajax(url)
            .done((data) => showData(data))
            .fail(console.log)
}
/// added options to select
function showData (beers) {
  const optionBeers = beers.map(function (beer) {
    return '<option value="' + beer.id + '">' + beer.name + '</option>'
  })
  const htmlSelect = optionBeers.join('')
  select.fadeIn().focus().html(htmlSelect)
}

/// request to a specified type of beer
function getBeer (id) {
  const url = `https://quiet-inlet-67115.herokuapp.com/api/beer/${id}`
  $.ajax(url)
    .done((data) => showBeer(data))
    .fail(console.log)
}
/// showBeer requested
function showBeer (beer) {
  var description = beer.style ? beer.style.description : 'No description available'
  var imgUrl = beer.labels ? beer.labels.medium : 'http://texasbeerbus.com/wp-content/uploads/2016/06/bar-1.jpg'
  $('#img').attr('src', imgUrl)
  $('#name').text(beer.name)
  $('#description').text(description)
  $('.selectOptions').fadeOut('slow')
  $('.search').fadeOut('slow')
  $('.thumbnail').fadeIn()
  $('#icon').fadeIn()
}

$('.searchInput')
  .focusin(function () {
    $(this).attr('placeholder', 'Search...')
  })
  .focusout(function () {
    $(this)
      .attr('placeholder', '')
      .val('')
  })

$('#icon').on('click', function () {
  $('.thumbnail').fadeOut('slow')
  $('.selectOptions').fadeIn('slow')
  $('.search').fadeIn()
  $(this).fadeOut()
})
