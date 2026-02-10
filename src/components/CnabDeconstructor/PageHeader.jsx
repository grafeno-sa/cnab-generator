import PropTypes from 'prop-types';

function PageHeader({ title, subtitle }) {
  return (
    <div className="row">
      <div className="col-12">
        <h2 className="cnab-deconstructor__title">{title}</h2>
        <p className="cnab-deconstructor__subtitle">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default PageHeader;
