const unlockButton = () => {
  return (
    <form action="/api/unlock" method="POST">
      <button type="submit">オートロック解除</button>
    </form>
  );
};

export default unlockButton;
