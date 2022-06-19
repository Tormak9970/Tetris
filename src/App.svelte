<script lang="ts">
    import { init } from "./Tetris";
    import Modal from "./lib/Modal.svelte";

    let showGame: boolean;
    $: showGame = false;
    let settingsModal: Modal;
    let optionModal: Modal;
    let sakModal: Modal;
    let lossModal: Modal;

    async function start() {
        showGame = true;
        init(
            setOptions,
            setSettings,
            setSAK,
            setLoss,
            settingsModal,
            optionModal,
            sakModal,
            lossModal
        );
    }

    const setOptions = (stat: boolean) => {
        optionModal.show(stat);
    };
    const setSettings = (stat: boolean) => {
        settingsModal.show(stat);
    };
    const setSAK = (stat: boolean) => {
        sakModal.show(stat);
    };
    const setLoss = (stat: boolean) => {
        lossModal.show(stat);
    };
</script>

<div id="tetrisContainer">
    <div class="game-container{showGame ? '' : ' hidden'}">
        <div class="holding-div" style="margin-right: 80px;">
            <div id="holdHeader" class="hold-header">
                <h3>Holding</h3>
            </div>
            <div id="holdingCanvasContainer" class="holding-canvas-container">
                <canvas
                    id="holdingBoard"
                    style="position: absolute; background: black; z-index: 1;"
                />
            </div>
        </div>
        <div class="board-div">
            <div id="game-header" class="header">
                <h2 id="scoreHeader" class="score-header">Score: 0</h2>
            </div>
            <div class="line" />
            <div id="canvas-container" class="canvas-container">
                <canvas
                    id="gameBoard"
                    style="position: absolute; background: black; z-index: 1;"
                />

                <Modal
                    id="settingsModal"
                    bind:this={settingsModal}
                    showing={false}
                >
                    <div class="settings-modal-content">
                        <div id="down-div" class="settings-button-div">
                            <h3 class="setting-name">Hard Drop</h3>
                            <button
                                type="button"
                                class="p1-up-button"
                                id="downButton">s</button
                            >
                        </div>
                        <div id="left-div" class="settings-button-div">
                            <h3 class="setting-name">Left</h3>
                            <button
                                type="button"
                                class="p1-down-button"
                                id="leftButton">a</button
                            >
                        </div>
                        <div id="right-div" class="settings-button-div">
                            <h3 class="setting-name">Right</h3>
                            <button
                                type="button"
                                class="p2-up-button"
                                id="rightButton">d</button
                            >
                        </div>
                        <div id="r-left-div" class="settings-button-div">
                            <h3 class="setting-name">Rotate Left</h3>
                            <button
                                type="button"
                                class="p2-up-button"
                                id="rLeftButton">q</button
                            >
                        </div>
                        <div id="r-right-div" class="settings-button-div">
                            <h3 class="setting-name">Rotate Right</h3>
                            <button
                                type="button"
                                class="p2-up-button"
                                id="rRightButton">e</button
                            >
                        </div>

                        <div id="reset-div" class="settings-button-div">
                            <h3 class="setting-name">Hold</h3>
                            <button
                                type="button"
                                class="reset-button"
                                id="resetButton">Space</button
                            >
                        </div>
                        <div id="pause-div" class="settings-button-div">
                            <h3 class="setting-name">Pause</h3>
                            <button
                                type="button"
                                class="pause-button"
                                id="pauseButton">Esc</button
                            >
                        </div>
                        <div class="back-button-div">
                            <button
                                type="button"
                                class="back-button"
                                id="backButton">Back</button
                            >
                        </div>
                    </div>
                </Modal>

                <Modal id="gameOverModal" bind:this={lossModal} showing={false}>
                    <div class="game-over-modal-content">
                        <div id="scoreHolder" class="score-div">Score: 0</div>
                        <button id="playAgainButton">PLAY AGAIN</button>
                    </div>
                </Modal>

                <Modal id="optionModal" bind:this={optionModal} showing={true}>
                    <div class="option-modal-content">
                        <button type="button" class="playButton" id="playButton"
                            >PLAY</button
                        >
                        <button
                            type="button"
                            class="supportButton"
                            id="supportButton">SUPPORT</button
                        >
                        <button
                            type="button"
                            class="settingsButton"
                            id="settingsButton">SETTINGS</button
                        >
                    </div>
                </Modal>

                <Modal id="sakModal" bind:this={sakModal} showing={false}>
                    <div class="sak-div">
                        <div class="sak-div-content">
                            <h2 class="sak-header">Press Any Key.</h2>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
    <div class="start-cont{!showGame ? '' : ' hidden'}">
        <div class="btn" on:click|stopPropagation={start}>
            <div>Click to Start</div>
        </div>
    </div>
</div>

<style>
    @import "/theme.css";

    #tetrisContainer {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .game-container {
        height: 638px;

        position: relative;

        display: flex;
        flex-direction: row;
    }

    .holding-div {
        display: flex;
        flex-direction: column;
    }

    .hold-header {
        color: var(--font-color);
        height: 40px;
        width: 130px;
        background: var(--bud-green);
        display: flex;
        column-gap: 7em;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    .board-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        position: relative;
    }

    .header {
        height: 40px;
        width: 260px;
        background: var(--bud-green);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    .score-header {
        color: var(--font-color);
    }

    .line {
        z-index: 3;
        position: absolute;

        top: 118px;

        height: 2px;
        background-color: var(--warning-red);
        width: 100%;
    }

    .canvas-container {
        width: 260px;
        height: 598px;
    }

    .settings-modal-content {
        left: 38%;
        background-color: transparent;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        height: 390px;
        top: 100px;
        border: 1px solid var(--bud-green);
    }

    .p1-up-button {
        width: 55px;
        height: 40px;
        padding: 7.5px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .p1-down-button {
        width: 55px;
        height: 40px;
        padding: 7.5px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .p2-up-button {
        width: 55px;
        height: 40px;
        padding: 7.5px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .reset-button {
        width: 55px;
        height: 40px;
        padding: 7.5px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .pause-button {
        width: 55px;
        height: 40px;
        padding: 7.5px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .back-button {
        width: 80px;
        padding: 7.5px;
        margin-bottom: 15px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .back-button:hover {
        transform: scale(1.2);
    }

    .settings-button-div {
        width: 225px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .setting-name {
        color: var(--font-color);
        font-size: 16px;
        padding: 0;
    }

    .option-modal-content {
        left: 38%;
        background-color: transparent;
        margin: 5%; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid var(--bud-green);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
    }

    .playButton {
        width: 100px;
        padding: 10px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 15px;
        transition: all 0.3s ease-in-out;
    }

    .playButton:hover {
        transform: scale(1.2);
    }

    .settingsButton {
        width: 100px;
        padding: 10px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .settingsButton:hover {
        transform: scale(1.2);
    }

    .supportButton {
        width: 100px;
        padding: 10px;
        margin-bottom: 15px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .supportButton:hover {
        transform: scale(1.2);
    }

    .sak-div {
        position: fixed;
        overflow: auto;
        width: 400px;
        top: 300px;
    }

    .sak-div-content {
        left: 38%;
        background-color: transparent;
        margin: 5%; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid var(--bud-green);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
    }
    .sak-header {
        color: var(--font-color);
    }

    .game-over-modal-content {
        left: 38%;
        background-color: transparent;
        margin: 5%; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid var(--bud-green);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
    }

    .score-div {
        margin: 15px 0px;
    }

    #playAgainButton {
        width: 100px;
        padding: 10px;
        color: var(--font-color);
        background-color: transparent;
        border: 1px solid var(--bud-green);
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        text-align: center;
    }

    #playAgainButton:hover {
        transform: scale(1.2);
    }

    .start-cont {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .btn {
        height: 30px;
        width: 100px;

        cursor: pointer;
        background-color: var(--bud-green);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border-radius: 10px;
    }

    .btn:hover {
        background-color: var(--bud-green__hover);
    }

    :global(.vCanvas) {
        z-index: 2;
    }

    .hidden {
        display: none;
    }
</style>
