<?php

namespace Pishran\NovaRtlTheme;

use Laravel\Nova\Nova;
use Laravel\Nova\Events\ServingNova;
use Illuminate\Support\ServiceProvider;

class ThemeServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Nova::serving(function (ServingNova $event) {
            Nova::style('nova-rtl-theme', __DIR__.'/../resources/css/theme.css');
        });

        $this->publishes([
            __DIR__.'/../resources/fonts' => public_path('vendor/nova-rtl-theme'),
        ], 'nova-rtl-theme');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
