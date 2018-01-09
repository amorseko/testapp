(function _AppProvidersImageUploadDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.image-upload.directive:image-upload
   * @restrict A
   *
   * @description
   * Upload image from camera or gallery.
   */
  function imgUpload(
    $cordovaCamera, $ionicActionSheet, $rootScope, $timeout, $window,
    cdn, graphql, toast, EVENT
  ) {
    function link(scope, element) {
      element.on('click', function click(event) {
        var Camera = $window.Camera;

        event.preventDefault();

        $timeout($ionicActionSheet.show({
          buttons: [
            { text: 'Take Picture' },
            { text: 'Choose Picture' }
          ],
          titleText: 'How would you like to set your picture?',
          cancelText: 'Cancel',
          buttonClicked: buttonClicked
        }), 5000);

        function buttonClicked(index) {
          $window.document.addEventListener('deviceready', function ready() {
            switch (index) {
              case 0: openImage(Camera.PictureSourceType.CAMERA); break;
              case 1: openImage(Camera.PictureSourceType.PHOTOLIBRARY); break;
              default: _.noop();
            }
          }, false);
        }

        function editProfile(variables) {
          var query = [
            'mutation EditProfile($photo: String) {',
            '  editProfile(photo: $photo) {',
            '    photo',
            '  }',
            '}'
          ].join('');

          graphql(query, variables)
            .then(function resolve(res) {
              return res && res.editProfile && res.editProfile.photo;
            })
            .then(function resolve(res) {
              if (!(res)) throw new Error();
              $rootScope.$emit(EVENT.PHOTO.CHANGED, res);
            });
        }

        function openImage(source) {
          $cordovaCamera.getPicture({
            quality: 100,
            targetWidth: 320,
            targetHeight: 320,
            correctOrientation: true,
            allowEdit: true,
            saveToPhotoAlbum: false,
            mediaType: Camera.MediaType.PICTURE,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: source
          })
          .then(function resolve(res) {
            if (!(res)) return false;
            toast.longBottom('Uploading image...');
            return cdn.upload(res);
          })
          .then(function resolve(res) {
            return res && res.response && angular.fromJson(res.response);
          })
          .then(function resolve(res) {
            if (!(res && res.filename)) throw new Error('Failed to upload image');
            return editProfile({ photo: res.filename });
          })
          .catch(function reject(err) {
            toast.longBottom(err.toString() || err);
          });
        }
      });
    }

    return {
      restict: 'A',
      link: link
    };
  }

  angular.module('app.providers.image-upload').directive('imageUpload', imgUpload);
}());
