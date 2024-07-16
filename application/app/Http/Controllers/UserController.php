<?php

namespace App\Http\Controllers;

use App\Events\AtualizaUsuarios;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;

class UserController extends Controller
{

    public function dashboard()
    {
        try {
            $usuariosAtivos = User::where('situacao', true)->count();
            $usuariosInativos = User::where('situacao', false)->count();

            return response()->json(['ativos' => $usuariosAtivos, 'inativos' => $usuariosInativos, 'total' => ($usuariosAtivos + $usuariosInativos)], 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Erro ao buscar dados. '], 500);
        }
    }

    public function index()
    {
        try {
            return User::all();
        } catch (QueryException $e) {
            return response()->json(['error' => 'Erro ao buscar dados. '], 500);
        }
    }


    public function store(Request $request)
    {
        $dados = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'situacao' => 'required|string',
            'data_admissao' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            User::create($dados);
            DB::commit();
            event(new AtualizaUsuarios(""));
            return response()->json(['message' => 'Cadastrado com sucesso.'], 201);
        } catch (QueryException $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erro ao criar registro. ' . $e], 500);
        }
    }

    public function show(string $id)
    {
        try {
            return User::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Registro não encontrado.'], 404);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Erro ao buscar dados.'], 500);
        }
    }


    public function update(Request $request, string $id)
    {
        $dados = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'situacao' => 'required|boolean',
            'data_admissao' => 'required|string',
        ]);

        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);
            $user->update($dados);
            DB::commit();
            event(new AtualizaUsuarios(""));
            return response()->json(['message' => 'Atualizado com sucesso.'], 200);
        } catch (QueryException $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erro ao atualizar registro.'], 500);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Registro não encontrado.'], 404);
        }
    }


    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);
            $user->delete();
            DB::commit();
            event(new AtualizaUsuarios(""));
            return response()->noContent();
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['error' => 'Registro não encontrado.'], 404);
        } catch (QueryException $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erro ao deletar registro.'], 500);
        }
    }
}
