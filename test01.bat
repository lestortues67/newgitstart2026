chcp 65001

@echo off

IF DEFINED VIRTUAL_ENV (
    echo Environnement virtuel detecte : %VIRTUAL_ENV%
) ELSE (
    echo Aucun environnement virtuel n'est actif.
)

