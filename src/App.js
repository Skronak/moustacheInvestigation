import React, {useEffect, useState} from 'react';
import BoardSuspect from './components/board/BoardSuspect.js';
import BoardInspector from './components/board/BoardInspector.js';
import Board from './components/board/Board.js';
import data from './data.json';
import './app.css';
import detective from "./img/avatar-detective.png";
import criminal from "./img/avatar-criminal.png";
import innocent from "./img/avatar-innocent.png";
import preview from "./img/preview.svg";
import AnimatedBackground from "./components/animatedBackground/AnimatedBackground.js";
import ModalWrapper from "./components/modal/ModalWrapper";
import PreviewModal from "./components/previewModal/PreviewModal";
import Tooltips from "./components/tooltips/Tooltips.tsx";
import {randGeneratorFrom} from "./utils/random.ts";
import HowToPlayButton from "./components/modal/HowToPlayButton.tsx";

export default function App() {
    const [isGameVisible, toggleGameVisible] = useState(false);
    const [isDetective, toggleIsDetective] = useState(false);
    const [nbPlayers, setNbPlayers] = useState(1);
    const [idPlayer, setIdPlayer] = useState(1);
    const [seed, setSeed] = useState('amis');
    const [idGuilty, setIdGuilty] = useState(0);
    const cases = new Map(data.map(obj => [obj.key, obj]));
    const [selectedCase, setSelectedCase] = useState(data[0].key);
    const [isFlipped, setFlipped] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const handleChange = (event) => {
        toggleIsDetective(event.target.checked);
    };

    useEffect(() => {
        console.log(idGuilty);
    }, [idGuilty]);

    function createRoles(casedata, lastSuspect) {
        for (let i = casedata.suspects.length - 1; i < +nbPlayers; i++) {
            casedata.suspects.push({role: `${lastSuspect.role} - ${+nbPlayers - i}`, context: lastSuspect.context});
        }
    }

    const startGame = (e) => {
        let rand = randGeneratorFrom(seed + selectedCase);
        setIdGuilty(rand(1, nbPlayers));
        let casedata = cases.get(selectedCase);
        let lastSuspect = casedata.suspects[casedata.suspects.length - 1];

        if (+nbPlayers > (casedata.suspects.length)) {
            createRoles(casedata, lastSuspect);
        }

        toggleScreen(e);
    }

    const endGame = (e) => {
        toggleIsDetective(false);
        toggleScreen(e);
    }

    const toggleScreen = (e) => {
        toggleGameVisible(!isGameVisible);
        e.stopPropagation();
    }

    const flip = () => {
        if (isGameVisible) {
            setFlipped(!isFlipped);
        }
    }

    return (
        <div onClick={() => flip()}>

            <AnimatedBackground/>

            {!isGameVisible ? <p className={"mainTitle"}>Les enquêtes de Moustache</p> : null}
            <div className={`container fiche ${isFlipped && isGameVisible ? "flip" : ""}`}>
                {isGameVisible ? (
                    <>
                        <Board data={cases.get(selectedCase)}>
                            {isDetective ? (
                                <BoardInspector data={cases.get(selectedCase)} nbPlayers={nbPlayers}/>
                            ) : (
                                <BoardSuspect data={cases.get(selectedCase)} idPlayer={+idPlayer}
                                              isGuilty={+idPlayer === +idGuilty}/>
                            )}
                            <input id='end-button' type="button" className="btn btn-dark"
                                   onClick={(e) => endGame(e)}
                                   value="Terminer la partie"/>
                        </Board>
                        <div className="back">
                            <p className={"flip-label"}>{isDetective ? "DETECTIVE" : +idPlayer === +idGuilty ? "COUPABLE" : "INNOCENT"}</p>
                            <img className={'avatar'} alt="avatar"
                                 src={isDetective ? detective : +idPlayer === +idGuilty ? criminal : innocent}/>
                        </div>
                    </>
                ) : (
                    <form>
                            <HowToPlayButton/>

                        <div className={"bloc"}>
                            <div className={'label-with-tooltip'}>
                                <div title="seed">Seed</div>
                                <Tooltips title="Ce champs doit être le même pour tous les joueurs. Sa valeur permet de déterminer le coupable et de rejouer les mêmes affaires "/>
                            </div>
                            <input type="text" className="form-control" onChange={e => setSeed(e.target.value)} min='0'
                                   value={seed}/>
                        </div>
                        <div className={"bloc"}>
                            <div className={'label-with-tooltip'}>
                                <div title={'nombre de joueurs'}>Nombre de joueurs</div>
                                <Tooltips title="Nombre total de joueur incluant le détective"/>
                            </div>
                            <input type="number" className="form-control"
                                   onChange={e => setNbPlayers(e.target.value - 1)}
                                   min='0'
                                   value={nbPlayers + 1}/>
                        </div>
                        <div className={"bloc"}>
                            <div className="divider"></div>
                        </div>
                        <div className={"bloc"}>
                            <span>Incarner le détective</span>
                            <label className="toggle detective-toggle">
                                <input className="toggle-checkbox" type="checkbox" onChange={handleChange}/>
                                <div className="toggle-switch"></div>
                            </label>
                        </div>
                        <div className={"bloc"}>
                            <div id="collapse" className={isDetective ? "hide" : "show"}>
                                <div className={'label-with-tooltip'}>
                                <div>Vous êtes le témoin n°</div>
                                    <Tooltips title={`Chaque témoin doit s'attribuer un numéro unique entre 1 et ${nbPlayers}`}/>
                                </div>
                                <input type="number" disabled={isDetective} className="form-control"
                                       pattern="^-?[0-9]\d*\.?\d*$"
                                       onChange={e => setIdPlayer(+e.target.value > +nbPlayers ? nbPlayers : e.target.value)}
                                       min='1' value={+idPlayer}/>
                            </div>
                        </div>
                        <div className={"bloc"}>
                            <div className="divider"></div>
                        </div>
                        <div className={"bloc"}>
                            <div>
                                <span className="affaire-bloc-title">Affaire ({[...cases.keys()].length})</span>
                                <img className={'button-icon'} alt='apercu de l"affaire' src={preview} onClick={()=>setOpenPreview(true)}/>
                            </div>
                            <select id='caseId' className="form-select" name="case" size={5} value={selectedCase}
                                    onChange={(e => setSelectedCase(e.target.value))}>
                                {[...cases.keys()].map((e, i) => <option value={e}>{i + 1} - {e}</option>)}
                            </select>
                        </div>
                        <div className={"bloc"}>
                            <input id='start-button' type="button" className="btn btn-success"
                                   onClick={(e) => startGame(e)}
                                   value="Commencer"/>
                        </div>
                    </form>
                )}
            </div>

            {openModal? (
                <ModalWrapper title={'Guide de jeu'} onClose={()=> setOpenModal(false)}>

                </ModalWrapper>) : null}
            {openPreview ? (
                <PreviewModal onClose={() => setOpenPreview(false)} case={cases.get(selectedCase)}/>
            ) : null}
        </div>
    )
}
