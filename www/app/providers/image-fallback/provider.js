(function _AppProviderImageFallbackProvider_() {
  'use strict';

  /** @this */
  function imageFallback() {
    var config = {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAA00lEQVR4Ae2XwQqDQAxEveinFD9e2MUfq6Cep7GnrPAg1JVCu5OTvEwe9FLtWlpqR6OyVn2aXbNGdX6KB4OLrmbRyIKsGsksWKsINhbUShM0wVcEk43CnAVY722mMEfBhPWD9mGOAlvBepSDwK1gPc5LASp8fbCJ81KACl9PNkOYo8CfKOtHUpijwJ841y1xToJy5VxXnLPgvUL1OAeBW4F6kKPAnYB6jKPAnYA68PZ/8EOCJtjvfvmdqwjSvR8gTz1YcCiytgs/TvLnvaDi/J2gCV63ZgZdEb12DwAAAABJRU5ErkJggg=='
    };

    /**
     * @ngdoc property
     * @name app.providers.image-fallback.service#set
     * @propertyOf app.providers.image-fallback.service:imageFallback
     *
     * @description
     * Object containing default values for image fallback configurations.
     * The object has following properties:
     *  - **image** - `{string}` - Default image uri.
     *
     * @example
       <example module="app">
         <file name="index.html"></file>
         <file name="script.js">
           angular.module('app', ['app.providers.image-fallback'])
            .config(function (imageFallbackProvider) {
              imageFallbackProvider.set({
                image: '/avatar.png'
              });
            });
         </file>
       </example>
     */
    this.set = function set(userConfig) {
      angular.merge(config, userConfig);
    };

    /**
     * @ngdoc service
     * @name app.providers.image-fallback.service:imageFallback
     *
     * @description
     * Image fallback service.
     */
    this.$get = function get() {
      return {
        config: config
      };
    };
  }

  angular.module('app.providers.image-fallback').provider('imageFallback', imageFallback);
}());
