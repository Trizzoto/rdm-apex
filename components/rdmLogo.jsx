// Shared RDM wordmark — uses real logo asset
function RDMLogo({ height = 32, style = {} }) {
  return (
    <img src="assets/rdm-logo.png" alt="RDM"
      style={{ height, width: 'auto', display: 'block', ...style }} />
  );
}
Object.assign(window, { RDMLogo });
