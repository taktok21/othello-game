import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ここで実際の送信処理を行う
    setTimeout(() => {
      alert('お問い合わせありがとうございます。3営業日以内にご連絡いたします。');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        budget: '',
        timeline: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'メール',
      value: 'contact@se-professional.jp',
      link: 'mailto:contact@se-professional.jp'
    },
    {
      icon: <Phone size={24} />,
      title: '電話',
      value: '03-1234-5678',
      link: 'tel:03-1234-5678'
    },
    {
      icon: <MapPin size={24} />,
      title: '所在地',
      value: '東京都渋谷区',
      link: null
    },
    {
      icon: <Clock size={24} />,
      title: '営業時間',
      value: '平日 9:00-18:00',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com',
      color: '#333'
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      color: '#0077b5'
    },
    {
      icon: <Twitter size={24} />,
      name: 'Twitter',
      url: 'https://twitter.com',
      color: '#1da1f2'
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">お問い合わせ</h2>
        <p className="contact-intro">
          プロジェクトのご相談やお見積もりなど、お気軽にお問い合わせください
        </p>

        <div className="contact-content">
          <div className="contact-form-section">
            <div className="form-header">
              <h3>プロジェクトのご相談</h3>
              <p>まずは簡単にプロジェクトの概要をお聞かせください。3営業日以内にご返信いたします。</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">お名前 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">メールアドレス *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">会社名・団体名</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">お問い合わせ種別 *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">選択してください</option>
                    <option value="web-development">Webアプリケーション開発</option>
                    <option value="infrastructure">クラウドインフラ構築</option>
                    <option value="migration">システム統合・移行</option>
                    <option value="consulting">技術コンサルティング</option>
                    <option value="team-support">チーム開発支援</option>
                    <option value="performance">パフォーマンス最適化</option>
                    <option value="other">その他</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">ご予算（概算）</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">選択してください</option>
                    <option value="under-500k">50万円未満</option>
                    <option value="500k-1m">50万円〜100万円</option>
                    <option value="1m-3m">100万円〜300万円</option>
                    <option value="3m-5m">300万円〜500万円</option>
                    <option value="over-5m">500万円以上</option>
                    <option value="consulting">相談して決めたい</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">希望開始時期</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">選択してください</option>
                    <option value="asap">すぐに</option>
                    <option value="1month">1ヶ月以内</option>
                    <option value="3months">3ヶ月以内</option>
                    <option value="6months">6ヶ月以内</option>
                    <option value="flexible">時期は相談</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">プロジェクトの詳細・ご要望 *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="プロジェクトの概要、達成したい目標、技術的な要件などをお聞かせください"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>送信中...</>
                ) : (
                  <>
                    <Send size={20} />
                    お問い合わせを送信
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="contact-info">
              <h3>連絡先情報</h3>
              <div className="info-list">
                {contactInfo.map((item, index) => (
                  <div key={index} className="info-item">
                    <div className="info-icon">
                      {item.icon}
                    </div>
                    <div className="info-content">
                      <h4>{item.title}</h4>
                      {item.link ? (
                        <a href={item.link}>{item.value}</a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="social-links">
              <h3>ソーシャルメディア</h3>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--social-color': social.color }}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="response-time">
              <h3>レスポンス時間</h3>
              <div className="response-info">
                <div className="response-item">
                  <strong>初回返信</strong>
                  <span>3営業日以内</span>
                </div>
                <div className="response-item">
                  <strong>お見積もり</strong>
                  <span>1週間以内</span>
                </div>
                <div className="response-item">
                  <strong>プロジェクト開始</strong>
                  <span>ご相談の上決定</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          background: var(--bg-secondary);
        }

        .contact-intro {
          text-align: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-form-section {
          background: white;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: var(--shadow-lg);
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-header h3 {
          font-size: 1.8rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-header p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid var(--border-color);
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--primary-color);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-info,
        .social-links,
        .response-time {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
        }

        .contact-info h3,
        .social-links h3,
        .response-time h3 {
          font-size: 1.3rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .info-icon {
          color: var(--primary-color);
          background: rgba(37, 99, 235, 0.1);
          padding: 0.75rem;
          border-radius: 0.5rem;
        }

        .info-content h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .info-content a,
        .info-content span {
          color: var(--text-secondary);
          text-decoration: none;
        }

        .info-content a:hover {
          color: var(--primary-color);
        }

        .social-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 0.5rem;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--social-color);
          color: white;
          transform: translateX(4px);
        }

        .response-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .response-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: var(--bg-secondary);
          border-radius: 0.5rem;
        }

        .response-item strong {
          color: var(--text-primary);
        }

        .response-item span {
          color: var(--primary-color);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .contact-form-section {
            padding: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;