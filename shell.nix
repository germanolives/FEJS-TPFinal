{ pkgs ? import <nixpkgs> {} }:
pkgs.mkShell {
  buildInputs = with pkgs; [ git gh python312 ];
  shellHook = ''
    export LANG=C.UTF-8
    export LC_ALL=C.UTF-8
    echo "🚀 Minimalist Web Environment Activated"
  '';
}
