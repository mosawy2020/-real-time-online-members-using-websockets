@extends('layouts.app')

@section('content')
<style>
    ul.list-group{
        font-size: 150% ; 
        color: green

    }
</style>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
                <p style="color: green ; font-size:200%"> online users</p>
                <ul class="list-group">
                  
                  </ul>
            </div>
        </div>
    </div>
</div>
@endsection
