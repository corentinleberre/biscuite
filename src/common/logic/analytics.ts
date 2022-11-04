import supabase from "../../supabaseClient";

type GameMode = "free" | "classic";

const updateGamePlayed = (gameMode: GameMode) => {
  supabase
    .from("analytics")
    .select("game_played")
    .eq("game_mode", gameMode)
    .then((response) => {
      if (response.data) {
        const game_played = response.data[0].game_played;
        supabase
          .from("analytics")
          .update({ game_played: game_played + 1 })
          .eq("game_mode", gameMode)
          .then();
      }
    });
};

export { updateGamePlayed };
