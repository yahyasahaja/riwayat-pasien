let idpasien

var App = {
  initApplication : function() {
    $(document).on('click', '#buttonpasien', function(){
      $.support.cors = true
      $.mobile.allowCrossDomainPages = true
      App.showPasien()
    })
    $(document).on('click', '#detail-pasien', function(){
      idpasien = $(this).data('idpasien')
    })
    $(document).on('pageinit', '#periksa', function(){
      App.showPeriksaPasien(idpasien)
    })
    $(document).on('click', '#detail-periksa', function(){
      var idperiksa = $(this).data('idperiksa')
      App.showPeriksaPenyakit(idperiksa)
    })
    $(document).on('click', '#buttondokter', function(){
      App.showDokter()
    })
    $(document).on('click', '#buttonpenyakit', function(){
      App.showPenyakit()
    })
  },

  showPasien : function() {
    $.ajax({
      url: 'https://riwayat-pasien.ngopi.men/patient_service.php',
      type: 'get',
      beforeSend : function() {
        $.mobile.loading('show', {
          text : 'Loading',
          textVisible : true
        })
      },
      success : function(dataObject) {
        console.log(dataObject)
        $("#listview").empty();
        for (let dt of dataObject.data) {
          $("#listview").append('<li><a href="#periksa?id='+
          dt.id+'"target="_self" id="detail-pasien" data-idpasien="'+dt.id+'"><h2>'+
          dt.name+'</h2><p>Tanggal lahis : '+
          dt.birthdate +'</p><p>Jenis Kelamin : '+
          dt.gender +'</p></a></li>');
        }
        $("#listview").listview("refresh");
      },
      complete : function() {
        $.mobile.loading('hide');
      }
    })
  },

  showPeriksaPasien : function(id) {
    $.ajax({
      url: 'https://riwayat-pasien.ngopi.men/medical_checks_service.php',
      type: 'get',
      beforeSend : function() {
        $.mobile.loading('show', {
          text : 'Loading',
          textVisible : true
        })
      },
      success : function(dataObject) {
        console.log(dataObject)
        console.log(id)
        $("#lvPeriksa").empty();
        for (let dt of dataObject.data) {
          if(dt.p_id == id){
            $("#nama_pasien").html(dt.patient_name)
            $("#lvPeriksa").append('<li><a href="#periksaPenyakit?id='+
            dt.mc_id+'"target="_self" id="detail-periksa" data-idperiksa="'+dt.mc_id+'"><h2>Dokter : '+
            dt.doctor_name+'</h2><p>Tanggal : '+
            dt.date +'</p><p></li>');
            console.log(dt)
          }
        }
        $("#lvPeriksa").listview("refresh");
      },
      complete : function() {
        $.mobile.loading('hide');
      }
    })
  },

  showPeriksaPenyakit : function(id) {
    console.log(id)
    $.ajax({
      url: 'https://riwayat-pasien.ngopi.men/medical_check_diseases_service.php?id='+id+'',
      type: 'get',
      beforeSend : function() {
        $.mobile.loading('show', {
          text : 'Loading',
          textVisible : true
        })
      },
      success : function(dataObject) {
        console.log(dataObject)
        $("#lvPeriksaPenyakit").empty();
        for (let dt of dataObject.data) {
            $("#lvPeriksaPenyakit").append('<li data-icon="false"><a href="#"><h2>Penyakit : '+
            dt.diseases+'</h2><p>Severity : '+
            dt.severity +'</p><p></li>');
            console.log(dt)
        }
        $("#lvPeriksaPenyakit").listview("refresh");
      },
      complete : function() {
        $.mobile.loading('hide');
      }
    })
  },

  showDokter : function() {
    $.ajax({
      url: 'https://riwayat-pasien.ngopi.men//doctor_service.php',
      type: 'get',
      beforeSend : function() {
        $.mobile.loading('show', {
          text : 'Loading',
          textVisible : true
        })
      },
      success : function(dataObject) {
        console.log(dataObject)
        $("#lvDokter").empty();
        for (let dt of dataObject.data) {
          $("#lvDokter").append('<li data-icon="false"><a href="#"><h2>'+
          dt.name+'</h2><p>Spesialis : '+
          dt.specialization +'</p><p>Jenis Kelamin : '+
          dt.gender +'</p></a></li>');
        }
        $("#lvDokter").listview("refresh");
      },
      complete : function() {
        $.mobile.loading('hide');
      }
    })
  },

  showPenyakit : function() {
    $.ajax({
      url: 'https://riwayat-pasien.ngopi.men/diseases_service.php',
      type: 'get',
      beforeSend : function() {
        $.mobile.loading('show', {
          text : 'Loading',
          textVisible : true
        })
      },
      success : function(dataObject) {
        console.log(dataObject)
        $("#lvPenyakit").empty();
        for (let dt of dataObject.data) {
          $("#lvPenyakit").append('<li data-icon="false"><a href="#"><h2>'+
          dt.name+'</h2><p>Severity : '+
          dt.severity +'</p></a></li>');
        }
        $("#lvPenyakit").listview("refresh");
      },
      complete : function() {
        $.mobile.loading('hide');
      }
    })
  }
}