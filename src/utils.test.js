import { describe, expect, it } from "vitest";
import { songs } from "./data/songs";
import { addUniqueSong, filterSongs, validatePlaylist } from "./utils";

describe("Music Playlist Creator Portal rules", () => {
  it("finds Shape of You by title", () => {
    const result = filterSongs(songs, "shape of you");
    expect(result[0].title).toBe("Shape of You");
  });

  it("filters the library by genre", () => {
    const result = filterSongs(songs, "", "Pop");
    expect(result.length).toBeGreaterThan(1);
    expect(result.every(song => song.genre === "Pop")).toBe(true);
  });

  it("prevents duplicate playlist tracks", () => {
    const one = addUniqueSong([], songs[0]);
    const two = addUniqueSong(one, songs[0]);
    expect(two).toHaveLength(1);
  });

  it("rejects a playlist name shorter than three characters", () => {
    expect(validatePlaylist({ name: "Hi", genre: "Pop", description: "" })).toHaveProperty("name");
  });
});
