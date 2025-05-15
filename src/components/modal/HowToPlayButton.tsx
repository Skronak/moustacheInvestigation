import * as React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import {IconButton} from "@mui/material";
import {purple} from "@mui/material/colors";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function HowToPlayButton() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <div className={'align-left'}>
            <input id='help-button' type="button" className="btn btn-success"
                   onClick={handleClickOpen}
                   value="COMMENT JOUER"/>
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                    Guide de jeu
                </DialogTitle>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: purple,
                        })}>
                        Fermer
                    </Button>
                </DialogActions>
                <DialogContent>
                    <p>Principe</p>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Le jeu est basé sur l'improvisation. Un joueur joue le rôle du célèbre inspecteur Moustache
                            et devra interroger
                            l'ensemble des autres joueurs au sujet de l'affaire afin de déterminer le coupable
                        </Typography>
                        <Typography gutterBottom>
                            Les joueurs ont plusieurs listes de mots qu'ils devront réussir à placer durant leurs
                            témoignages, le coupabe a des mots légerement différents.
                            L'inspecteur devra être attentif pour identifier le coupable
                        </Typography>
                    </DialogContent>
                    <p>
                        Déroulement de la partie
                    </p>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Lancement de la partie
                            Tous les joueurs choisissent la même seed et la renseigne dans l'application. Elle clé
                            permet
                            de déterminer le même coupable pour tous les joueurs et donc de rejouer les mêmes affaires
                            si elle est changée
                        </Typography>
                        <Typography gutterBottom>
                            Un joueur doit incarner le prestigieux rôle de l'inspecteur.</Typography>
                        <Typography gutterBottom>
                            <p>TOUR 1</p>
                            A tour de rôle l'inspecteur va interroger tous les suspects qui devront alors placer
                            l'ensemble
                            des
                            mots correspondant au 1er interrogatoire(I)
                        </Typography>
                        <Typography gutterBottom>
                            <p>TOUR 2</p>
                            A nouveau, l'inspecteur peut interroger dans l'ordre de son choix tous les suspects qui
                            devront
                            alors placer l'ensemble des mots correspondant au second interrogatoire (II)
                            <p>
                                A la fin de l'interrogatoire l'inspecteur devra déterminer le coupable, les autres
                                joueurs
                                peuvent également émettre leurs avis
                            </p>
                        </Typography>
                    </DialogContent>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}
