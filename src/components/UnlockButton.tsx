export default function UnlockButton() {
  return (
    <>
      <h1>Door unlocker</h1>

      <form action="/api/unlock" method="POST">
        <button type="submit">オートロック解除</button>
      </form>
    </>
  );
}
