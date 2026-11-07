<?php
namespace App\Http\Controllers;

class ArtikelController extends Controller
{
    public function index()
    {
        return view('artikel.index');
    }

    public function show($id)
    {
        return view('artikel.index', [
            'artikelId' => $id
        ]);
    }
}