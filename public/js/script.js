var episodes;
var handle = "GST";

$(document).ready(function() {
  var rss_url = "/episodes.mp3.rss";
  $.get(rss_url, function(xml) {
    var json = $.xmlToJSON(xml, null, 1);

    episodes = json.channel[0].item;
    var latest;
    $.each(episodes, function(index, value) {
      $("#episode-list").append('<li><a id="episode-'+index+'" href="javascript:selectEpisode('+index+')">'+value.title[0].Text+"</a></li>");
      latest = index;
    });

    var urlhash = self.location.hash;
    var preselection = latest;

    // Check for GST prefix, slice and extract episode number
    if (urlhash.match(/#GST\d+$/)){
      var episodeNumber = Math.floor(urlhash.substring(4));
      $.each(episodes, function(index, value) {
        if (handle+pad(episodeNumber,3) == value.guid[0].Text) preselection = index;
      });
    }
    selectEpisode(preselection, -1);
  });
});

var audioplayer;

function selectEpisode(episodenumber, jumpSeconds) {
  // Clean up
  $("#audioplayer").empty();
  $("#title").empty();
  $("#shownotes").empty();
  $("#episode-list li a").removeClass("active");

  // Fill in new episode
  var preload = (jumpSeconds > 0 ) ? "auto" : "none";
  var episode = episodes[episodenumber];
  var enclosure = episode.enclosure[0].url;
  var description = episode.description[0].Text;
  var pubDate = moment(episode.pubDate[0].Text);

  $("#title").append('<a href="'+enclosure+'">'+episode.title[0].Text+'</a>');
  $("#audioplayer").append('<audio src="'+enclosure+'" preload="'+preload+'"></audio>');
  $("#shownotes").html(description);
  $("#episode-" + episodenumber).addClass("active");
  $("time#pubdate").attr("datetime", pubDate.format("YYYY-MM-DD HH:mm"));
  $("time#pubdate").html(pubDate.format("Do MMMM YYYY"));

  self.location.hash = episode.guid[0].Text;

  var as = audiojs.createAll();
  audioplayer = as[0]
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) str = '0' + str;
  return str
}

function showimpressum() {
  var impressum = "";
  impressum += "Impressum gem. § 5 TMG und § 55 Rundfunkstaatsvertrag\n\n";
  impressum += "http://geekstammtisch.de ist ein publizistisches Angebot von Dirk Breuer und Sebastian Cohnen.\n\n";
  impressum += "Postanschrift\n\nHochstadenstr. 1-3\n50674 Köln\n\nE-Mail\n\nalle@geekstammtisch.de\n\n";
  impressum += "Verantwortlicher nach § 55, Abs. 2, Rundfunkstaatsvertrag: s.o.";

  alert(impressum);
}
