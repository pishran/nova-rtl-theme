<?php

namespace Pishran\NovaRtlTheme;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class ThemeServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if (in_array(app()->getLocale(), config('nova-rtl-theme.locales'))) {
            Nova::serving(function (ServingNova $event) {
                Nova::provideToScript([
                    'nova_rtl_theme' => [
                        'stylesheet' => config('nova-rtl-theme.stylesheet'),
                        'font_family' => config('nova-rtl-theme.font-family'),
                    ],
                ]);

                Nova::style('nova-rtl-theme', __DIR__.'/../resources/css/theme.css');

                Nova::script('nova-rtl-theme', __DIR__.'/../resources/js/theme.js');
            });
        }

        $this->publishes([
            __DIR__.'/../config/nova-rtl-theme.php' => config_path('nova-rtl-theme.php'),
        ], 'nova-rtl-theme');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/../config/nova-rtl-theme.php', 'nova-rtl-theme'
        );
    }
}
