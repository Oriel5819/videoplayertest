import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactPllayer from "react-player";
import ResponsivePlayer from "../components/ResponsivePlayer";
import "./App.css";

interface IState {
  firstCaption: string;
  secondCaption: string;
  isPlayed: boolean;
  isOnProgress: {
    playedSeconds: number;
    played: number;
    loadedSeconds: number;
    loaded: number;
  };
  isUnderFiveSeconds: boolean;
  isShowFirstMessage: boolean;
  isShowSecondMessage: boolean;
}

function App() {
  const [state, setState] = useState<IState>({
    firstCaption: "",
    secondCaption: "",
    isPlayed: false,
    isOnProgress: {
      playedSeconds: 0,
      played: 0,
      loadedSeconds: 0,
      loaded: 0,
    },
    isUnderFiveSeconds: true,
    isShowFirstMessage: false,
    isShowSecondMessage: false,
  });

  const handleProgress = (progress: any) => {
    setState({
      ...state,
      isOnProgress: {
        playedSeconds: progress.playedSeconds,
        played: progress.played,
        loadedSeconds: progress.loadedSeconds,
        loaded: progress.loaded,
      },
    });

    if (
      state.isOnProgress.playedSeconds >= 4.0 &&
      state.isOnProgress.played < 1 &&
      state.isPlayed === true &&
      state.isUnderFiveSeconds === true
    ) {
      setState({
        ...state,
        isPlayed: false,
        isUnderFiveSeconds: false,
        isShowFirstMessage: true,
      });
    }
  };

  const handleOKClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (state.firstCaption === "" || state.secondCaption === "") {
      alert("Please fill the captions first");
    } else {
      setState({
        ...state,
        isPlayed: !state.isPlayed,
        isShowFirstMessage: false,
        isShowSecondMessage: false,
      });
    }
  };

  const handlePlay = () => {
    setState({ ...state, isPlayed: true });
  };

  const handlePause = () => {
    setState({ ...state, isPlayed: false });
  };

  const handleEnd = () => {
    setState({
      ...state,
      isShowSecondMessage: true,
      isUnderFiveSeconds: true,
    });
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">React Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="md">
        <div className="playerWrapper">
          <ResponsivePlayer
            url="https://setem.fr/wp-content/uploads/2022/05/1065464989-hd_4.mp4"
            onprogress={handleProgress}
            onplaying={state.isPlayed}
            onplay={handlePlay}
            onpause={handlePause}
            onended={handleEnd}
          />
          <div className="playerController">
            {((state.isShowFirstMessage && !state.isShowSecondMessage) ||
              (!state.isShowFirstMessage && state.isShowSecondMessage)) && (
              <Grid
                container
                direction={"column"}
                alignItems="center"
                justifyContent={"space-between"}
                gap={3}
                style={{ padding: 16 }}
              >
                <Grid item>
                  <Typography variant="h5" style={{ color: "white" }}>
                    {(state.isShowFirstMessage && state.firstCaption) ||
                      (state.isShowSecondMessage && state.secondCaption)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleOKClick}
                    style={{ color: "white", backgroundColor: "black" }}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
          <div className="formWrapper">
            <form className="captions" onSubmit={handleOKClick}>
              <input
                type="text"
                name="fiveseconds"
                onChange={(e) => {
                  setState({ ...state, firstCaption: e.target.value });
                }}
              />
              <input
                type="text"
                name="end"
                onChange={(e) => {
                  setState({ ...state, secondCaption: e.target.value });
                }}
              />
              <button type="submit">
                {state.isPlayed ? "Pause ||" : "Play |>"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;

{
  /* <div className="App">
  <div className="playerWrapper">
    <ResponsivePlayer
      url="https://setem.fr/wp-content/uploads/2022/05/1065464989-hd_4.mp4"
      onprogress={handleProgress}
      onplaying={state.isPlayed}
      onplay={handlePlay}
      onpause={handlePause}
    />

    <div className="playController">
      <form className="captions" onSubmit={handleOKClick}>
        <input
          type="text"
          name="fiveseconds"
          onChange={(e) => {
            setState({ ...state, firstCaption: e.target.value });
          }}
        />
        <input
          type="text"
          name="end"
          onChange={(e) => {
            setState({ ...state, secondCaption: e.target.value });
          }}
        />
        <button type="submit">OK</button>
      </form>
    </div>
  </div>
</div>; */
}
